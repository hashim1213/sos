"use server"

import { revalidatePath } from "next/cache"
import { auth, requireAuth } from "@/lib/auth"
import { createJobInDb, getOpenJobsFromDb, getJobByIdFromDb, getOrganizerJobsFromDb } from "@/lib/db/jobs"
import type { Job, JobWithOrganizer } from "@/lib/types"

// Create a new job posting
export async function createJob(formData: FormData) {
    const session = await auth()
    requireAuth("/login?callbackUrl=/jobs/post")

    if (!session || session.user.role !== "ORGANIZER") {
        throw new Error("Unauthorized: Only organizers can post jobs")
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const jobType = formData.get("jobType") as string
    const location = formData.get("location") as string
    const date = formData.get("date") as string
    const startTime = formData.get("startTime") as string
    const duration = Number.parseInt(formData.get("duration") as string)
    const hourlyRate = Number.parseFloat(formData.get("hourlyRate") as string)

    // Validate required fields
    if (!title || !jobType || !location || !date || !startTime || !duration || !hourlyRate) {
        throw new Error("Missing required fields")
    }

    try {
        const job = await createJobInDb(
            session.user.id,
            title,
            description,
            jobType,
            location,
            date,
            startTime,
            duration,
            hourlyRate,
        )

        revalidatePath("/jobs")
        revalidatePath("/dashboard")

        return { success: true, job }
    } catch (error) {
        console.error("Error creating job:", error)
        throw new Error("Failed to create job posting")
    }
}

// Get all open jobs with organizer info
export async function getOpenJobs(): Promise<JobWithOrganizer[]> {
    try {
        return await getOpenJobsFromDb()
    } catch (error) {
        console.error("Error fetching open jobs:", error)
        throw new Error("Failed to fetch open jobs")
    }
}

// Get job details by ID
export async function getJobById(jobId: number): Promise<JobWithOrganizer | null> {
    try {
        return await getJobByIdFromDb(jobId)
    } catch (error) {
        console.error(`Error fetching job with ID ${jobId}:`, error)
        throw new Error("Failed to fetch job details")
    }
}

// Get jobs posted by the current organizer
export async function getOrganizerJobs(): Promise<Job[]> {
    requireAuth("/login?callbackUrl=/dashboard")

    const session = await auth()

    if (!session || session.user.role !== "ORGANIZER") {
        throw new Error("Unauthorized: Only organizers can view their jobs")
    }

    try {
        return await getOrganizerJobsFromDb(session.user.id)
    } catch (error) {
        console.error("Error fetching organizer jobs:", error)
        throw new Error("Failed to fetch your job postings")
    }
}
