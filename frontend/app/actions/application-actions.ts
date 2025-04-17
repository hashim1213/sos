"use server"

import { revalidatePath } from "next/cache"
import { auth, requireAuth } from "@/lib/auth"
import {
  applyForJobInDb,
  getJobApplicationsFromDb,
  getStaffApplicationsFromDb,
  updateApplicationStatusInDb,
} from "@/lib/db/jobs"
import type { ApplicationWithStaffAndJob } from "@/lib/types"

// Apply for a job
export async function applyForJob(formData: FormData) {
  // Check authentication
  requireAuth("/login?callbackUrl=/jobs")
  const session = await auth()

  if (!session || session.user.role !== "STAFF") {
    throw new Error("Unauthorized: Only staff members can apply for jobs")
  }

  const jobId = Number.parseInt(formData.get("jobId") as string)
  const message = formData.get("message") as string

  if (!jobId) {
    throw new Error("Job ID is required")
  }

  try {
    const application = await applyForJobInDb(jobId, session.user.id, message || "")

    revalidatePath(`/jobs/${jobId}`)
    revalidatePath("/applications")

    return { success: true, application }
  } catch (error) {
    console.error("Error applying for job:", error)
    throw new Error(error instanceof Error ? error.message : "Failed to apply for job")
  }
}

// Get applications for a specific job (for organizers)
export async function getJobApplications(jobId: number): Promise<ApplicationWithStaffAndJob[]> {
  // Check authentication
  requireAuth(`/login?callbackUrl=/jobs/${jobId}/applications`)
  const session = await auth()

  if (!session || session.user.role !== "ORGANIZER") {
    throw new Error("Unauthorized: Only organizers can view job applications")
  }

  try {
    return await getJobApplicationsFromDb(jobId, session.user.id)
  } catch (error) {
    console.error(`Error fetching applications for job ${jobId}:`, error)
    throw new Error(error instanceof Error ? error.message : "Failed to fetch job applications")
  }
}

// Get applications made by the current staff member
export async function getStaffApplications(): Promise<ApplicationWithStaffAndJob[]> {
  // Check authentication
  requireAuth("/login?callbackUrl=/dashboard")
  const session = await auth()

  if (!session || session.user.role !== "STAFF") {
    throw new Error("Unauthorized: Only staff members can view their applications")
  }

  try {
    return await getStaffApplicationsFromDb(session.user.id)
  } catch (error) {
    console.error("Error fetching staff applications:", error)
    throw new Error("Failed to fetch your job applications")
  }
}

// Update application status (for organizers)
export async function updateApplicationStatus(formData: FormData) {
  // Check authentication
  requireAuth("/login")
  const session = await auth()

  if (!session || session.user.role !== "ORGANIZER") {
    throw new Error("Unauthorized: Only organizers can update application status")
  }

  const applicationId = Number.parseInt(formData.get("applicationId") as string)
  const status = formData.get("status") as "accepted" | "rejected"

  if (!applicationId || !status) {
    throw new Error("Application ID and status are required")
  }

  try {
    const application = await updateApplicationStatusInDb(applicationId, status, session.user.id)

    revalidatePath(`/jobs/${application.jobId}`)
    revalidatePath("/applications")
    revalidatePath("/dashboard")

    return { success: true, application }
  } catch (error) {
    console.error("Error updating application status:", error)
    throw new Error(error instanceof Error ? error.message : "Failed to update application status")
  }
}
