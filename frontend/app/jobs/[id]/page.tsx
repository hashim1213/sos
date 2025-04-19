import { Suspense } from "react"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { getJobById } from "@/app/actions/job-actions"
import { JobApplicationForm } from "@/components/job-application-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, ClockIcon, MapPinIcon, DollarSignIcon, BriefcaseIcon } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { auth } from "@/lib/auth"

interface JobDetailsPageProps {
  params: {
    id: string
  }
}

async function JobDetails({ jobId }: { jobId: number }) {
  const job = await getJobById(jobId)

  if (!job) {
    notFound()
  }

  // Format the date
  const formattedDate = format(new Date(job.date), "MMMM d, yyyy")

  // Calculate total pay
  const totalPay = job.hourlyRate * job.duration

  // Get organizer name
  const organizerName = job.organizer.companyName || `${job.organizer.firstName} ${job.organizer.lastName}`

  // Get initials for avatar fallback
  const initials = job.organizer.firstName.charAt(0) + job.organizer.lastName.charAt(0)

  // Get current user session
  const session = await auth()
  const isStaff = session?.user.role === "STAFF"
  const isOrganizer = session?.user.role === "ORGANIZER"
  const isJobOwner = isOrganizer && session?.user.id === job.organizerId

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-500">Posted by {organizerName}</p>
        </div>
        <Badge variant="outline" className="w-fit capitalize">
          {job.jobType}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {job.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Date</h3>
                    <p className="text-gray-700">{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ClockIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Time</h3>
                    <p className="text-gray-700">
                      {job.startTime} ({job.duration} hours)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-700">{job.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <DollarSignIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Pay</h3>
                    <p className="text-gray-700">
                      ${job.hourlyRate.toFixed(2)}/hour (${totalPay.toFixed(2)} total)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <BriefcaseIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Job Type</h3>
                    <p className="text-gray-700 capitalize">{job.jobType}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {isJobOwner && (
            <Card>
              <CardHeader>
                <CardTitle>Manage Job</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" asChild>
                    <a href={`/jobs/${job.id}/applications`}>View Applications</a>
                  </Button>
                  <Button variant="outline">Edit Job</Button>
                  {job.status === "open" && <Button variant="destructive">Cancel Job</Button>}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About the Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={job.organizer.avatar || ""} alt={organizerName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{organizerName}</p>
                  <p className="text-sm text-gray-500">Event Organizer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {isStaff && job.status === "open" && (
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Job</CardTitle>
              </CardHeader>
              <CardContent>
                <JobApplicationForm jobId={job.id} />
              </CardContent>
            </Card>
          )}

          {!session && (
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-center">Sign in to apply for this job</p>
                <Button className="w-full" asChild>
                  <a href={`/login?callbackUrl=/jobs/${job.id}`}>Sign In</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {job.status !== "open" && (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">This job is no longer accepting applications</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const jobId = Number.parseInt(params.id)
  const session = await auth()
  
  if (isNaN(jobId)) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar session={session}/>
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <Suspense fallback={<div>Loading job details...</div>}>
            <JobDetails jobId={jobId} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
