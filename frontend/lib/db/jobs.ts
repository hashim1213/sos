/*// This file contains server-side only database access functions
import { db } from "@/lib/db"
import type { Job, JobWithOrganizer, Application, ApplicationWithStaffAndJob } from "@/lib/types"

// Create a new job
export async function createJobInDb(
  organizerId: string,
  title: string,
  description: string,
  jobType: string,
  location: string,
  date: string,
  startTime: string,
  duration: number,
  hourlyRate: number,
): Promise<Job> {
  const result = await db.execute(
    `INSERT INTO "Job" (
      "organizerId", "title", "description", "jobType", "location", "date", "startTime", "duration", "hourlyRate", "status"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, 'open'
    ) RETURNING *`,
    [organizerId, title, description, jobType, location, date, startTime, duration, hourlyRate],
  )

  return result.rows[0] as Job
}

// Get all open jobs with organizer info
export async function getOpenJobsFromDb(): Promise<JobWithOrganizer[]> {
  const result = await db.execute(
    `SELECT j.*, 
      u."firstName", u."lastName",
      o."companyName", o."avatar"
    FROM "Job" j
    JOIN "User" u ON j."organizerId" = u.id
    LEFT JOIN "Organizer" o ON u.id = o."userId"
    WHERE j.status = 'open'
    ORDER BY j."createdAt" DESC`,
  )

  return result.rows.map((job: any) => ({
    ...job,
    organizer: {
      companyName: job.companyName,
      firstName: job.firstName,
      lastName: job.lastName,
      avatar: job.avatar,
    },
  }))
}

// Get job by ID with organizer info
export async function getJobByIdFromDb(jobId: number): Promise<JobWithOrganizer | null> {
  const result = await db.execute(
    `SELECT j.*, 
      u."firstName", u."lastName",
      o."companyName", o."avatar"
    FROM "Job" j
    JOIN "User" u ON j."organizerId" = u.id
    LEFT JOIN "Organizer" o ON u.id = o."userId"
    WHERE j.id = $1`,
    [jobId],
  )

  if (result.rows.length === 0) {
    return null
  }

  const job = result.rows[0]
  return {
    ...job,
    organizer: {
      companyName: job.companyName,
      firstName: job.firstName,
      lastName: job.lastName,
      avatar: job.avatar,
    },
  }
}

// Get jobs posted by an organizer
export async function getOrganizerJobsFromDb(organizerId: string): Promise<Job[]> {
  const result = await db.execute(
    `SELECT * FROM "Job"
    WHERE "organizerId" = $1
    ORDER BY "createdAt" DESC`,
    [organizerId],
  )

  return result.rows as Job[]
}

// Apply for a job
export async function applyForJobInDb(jobId: number, staffId: string, message: string): Promise<Application> {
  // Check if user has already applied for this job
  const existingResult = await db.execute(
    `SELECT * FROM "Application"
    WHERE "jobId" = $1 AND "staffId" = $2`,
    [jobId, staffId],
  )

  if (existingResult.rows.length > 0) {
    throw new Error("You have already applied for this job")
  }

  // Check if job exists and is still open
  const jobResult = await db.execute(
    `SELECT * FROM "Job"
    WHERE id = $1 AND status = 'open'`,
    [jobId],
  )

  if (jobResult.rows.length === 0) {
    throw new Error("Job not found or no longer accepting applications")
  }

  // Create the application
  const result = await db.execute(
    `INSERT INTO "Application" (
      "jobId", "staffId", "status", "message"
    ) VALUES (
      $1, $2, 'pending', $3
    ) RETURNING *`,
    [jobId, staffId, message],
  )

  return result.rows[0] as Application
}

// Get applications for a specific job
export async function getJobApplicationsFromDb(
  jobId: number,
  organizerId: string,
): Promise<ApplicationWithStaffAndJob[]> {
  // First check if the job belongs to this organizer
  const jobResult = await db.execute(
    `SELECT * FROM "Job"
    WHERE id = $1 AND "organizerId" = $2`,
    [jobId, organizerId],
  )

  if (jobResult.rows.length === 0) {
    throw new Error("Job not found or you do not have permission to view its applications")
  }

  const result = await db.execute(
    `SELECT a.*, j.*,
      u."firstName", u."lastName",
      s."jobTitle", s."avatar"
    FROM "Application" a
    JOIN "Job" j ON a."jobId" = j.id
    JOIN "User" u ON a."staffId" = u.id
    LEFT JOIN "Staff" s ON u.id = s."userId"
    WHERE a."jobId" = $1
    ORDER BY a."createdAt" DESC`,
    [jobId],
  )

  return result.rows.map((app: any) => ({
    id: app.id,
    jobId: app.jobId,
    staffId: app.staffId,
    status: app.status,
    message: app.message,
    createdAt: app.createdAt,
    updatedAt: app.updatedAt,
    staff: {
      firstName: app.firstName,
      lastName: app.lastName,
      avatar: app.avatar,
      jobTitle: app.jobTitle,
    },
    job: {
      id: app.id,
      organizerId: app.organizerId,
      title: app.title,
      description: app.description,
      jobType: app.jobType,
      location: app.location,
      date: app.date,
      startTime: app.startTime,
      duration: app.duration,
      hourlyRate: app.hourlyRate,
      status: app.status,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    },
  }))
}

// Get applications made by a staff member
export async function getStaffApplicationsFromDb(staffId: string): Promise<ApplicationWithStaffAndJob[]> {
  const result = await db.execute(
    `SELECT a.*, j.*,
      u."firstName", u."lastName"
    FROM "Application" a
    JOIN "Job" j ON a."jobId" = j.id
    JOIN "User" u ON a."staffId" = u.id
    WHERE a."staffId" = $1
    ORDER BY a."createdAt" DESC`,
    [staffId],
  )

  return result.rows.map((app: any) => ({
    id: app.id,
    jobId: app.jobId,
    staffId: app.staffId,
    status: app.status,
    message: app.message,
    createdAt: app.createdAt,
    updatedAt: app.updatedAt,
    staff: {
      firstName: app.firstName,
      lastName: app.lastName,
    },
    job: {
      id: app.id,
      organizerId: app.organizerId,
      title: app.title,
      description: app.description,
      jobType: app.jobType,
      location: app.location,
      date: app.date,
      startTime: app.startTime,
      duration: app.duration,
      hourlyRate: app.hourlyRate,
      status: app.status,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    },
  }))
}

// Update application status
export async function updateApplicationStatusInDb(
  applicationId: number,
  status: "accepted" | "rejected",
  organizerId: string,
): Promise<Application> {
  // First check if the application is for a job owned by this organizer
  const checkResult = await db.execute(
    `SELECT a.*, j."organizerId"
    FROM "Application" a
    JOIN "Job" j ON a."jobId" = j.id
    WHERE a.id = $1`,
    [applicationId],
  )

  if (checkResult.rows.length === 0) {
    throw new Error("Application not found")
  }

  const application = checkResult.rows[0]

  if (application.organizerId !== organizerId) {
    throw new Error("You do not have permission to update this application")
  }

  // Update the application status
  const updateResult = await db.execute(
    `UPDATE "Application"
    SET status = $1, "updatedAt" = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *`,
    [status, applicationId],
  )

  // If accepting the application, create a booking
  if (status === "accepted") {
    const jobId = application.jobId
    const staffId = application.staffId

    // Get job details to calculate total amount
    const jobResult = await db.execute(
      `SELECT * FROM "Job"
      WHERE id = $1`,
      [jobId],
    )

    const job = jobResult.rows[0]
    const totalAmount = job.hourlyRate * job.duration
    const serviceFee = totalAmount * 0.15 // 15% service fee

    // Create booking
    await db.execute(
      `INSERT INTO "Booking" (
        "jobId", "staffId", "organizerId", "status", "totalAmount", "serviceFee", "paymentStatus"
      ) VALUES (
        $1, $2, $3, 'confirmed', $4, $5, 'pending'
      )`,
      [jobId, staffId, organizerId, totalAmount, serviceFee],
    )

    // Update job status to filled
    await db.execute(
      `UPDATE "Job"
      SET status = 'filled', "updatedAt" = CURRENT_TIMESTAMP
      WHERE id = $1`,
      [jobId],
    )

    // Reject all other applications for this job
    await db.execute(
      `UPDATE "Application"
      SET status = 'rejected', "updatedAt" = CURRENT_TIMESTAMP
      WHERE "jobId" = $1 AND id != $2`,
      [jobId, applicationId],
    )
  }

  return updateResult.rows[0] as Application
}
*/