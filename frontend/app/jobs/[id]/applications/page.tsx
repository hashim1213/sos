import { Suspense } from "react"
import { notFound, redirect } from "next/navigation"
import { getJobById } from "@/app/actions/job-actions"
//import { getJobApplications, updateApplicationStatus } from "@/app/actions/application-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { auth } from "@/lib/auth"
import { format } from "date-fns"

interface ApplicationsPageProps {
  params: {
    id: string
  }
}

async function ApplicationsList({ jobId }: { jobId: number }) {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  // Redirect if not logged in or not an organizer
  //if (!session || session.user.role !== "ORGANIZER") {
  //  redirect("/login?callbackUrl=/jobs/${jobId}/applications")
  //}

  const job = await getJobById(jobId)

  if (!job) {
    notFound()
  }

  // Check if the current user is the job owner
  if (job.organizerId !== session.user.id) {
    redirect("/jobs")
  }

  const applications = await getJobApplications(jobId)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Applications for {job.title}</h1>
        <p className="text-gray-500">{applications.length} applications received</p>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application) => {
            // Get initials for avatar fallback
            const initials = application.staff.firstName.charAt(0) + application.staff.lastName.charAt(0)

            // Format the application date
            const formattedDate = format(new Date(application.createdAt), "MMM d, yyyy")

            return (
              <Card key={application.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={application.staff.avatar || ""} alt={application.staff.firstName} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {application.staff.firstName} {application.staff.lastName}
                        </h3>
                        {application.staff.jobTitle && (
                          <p className="text-sm text-gray-500">{application.staff.jobTitle}</p>
                        )}
                        <p className="text-xs text-gray-400">Applied on {formattedDate}</p>
                      </div>
                    </div>

                    <div className="flex-1">
                      {application.message && (
                        <div className="rounded-lg bg-gray-50 p-3 text-sm">{application.message}</div>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-center gap-2">
                      <Badge
                        variant={
                          application.status === "accepted"
                            ? "success"
                            : application.status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {application.status}
                      </Badge>

                      {application.status === "pending" && (
                        <div className="flex gap-2">
                          <form action={updateApplicationStatus}>
                            <input type="hidden" name="applicationId" value={application.id} />
                            <input type="hidden" name="status" value="accepted" />
                            <Button variant="success" size="sm" type="submit">
                              Accept
                            </Button>
                          </form>

                          <form action={updateApplicationStatus}>
                            <input type="hidden" name="applicationId" value={application.id} />
                            <input type="hidden" name="status" value="rejected" />
                            <Button variant="destructive" size="sm" type="submit">
                              Reject
                            </Button>
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-gray-500">No applications received yet.</p>
        </div>
      )}
    </div>
  )
}

export default async function ApplicationsPage({ params }: ApplicationsPageProps) {
  const jobId = Number.parseInt(params.id)

  if (isNaN(jobId)) {
    notFound()
  }

  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar session={session}/>
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <Suspense fallback={<div>Loading applications...</div>}>
            <ApplicationsList jobId={jobId} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
