import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getOrganizerJobs } from "@/app/actions/job-actions"
//import { getStaffApplications } from "@/app/actions/application-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

async function OrganizerDashboard() {
  const jobs = await getOrganizerJobs()
  //const jobs : any = []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Job Postings</h2>
        <Button asChild>
          <Link href="/jobs/post">Post a New Job</Link>
        </Button>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job : any) => (
            <Card key={job.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{job.jobType}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        job.status === "open"
                          ? "outline"
                          : job.status === "filled"
                            ? "success"
                            : job.status === "cancelled"
                              ? "destructive"
                              : "secondary"
                      }
                    >
                      {job.status}
                    </Badge>

                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/jobs/${job.id}`}>View</Link>
                    </Button>

                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/jobs/${job.id}/applications`}>Applications</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-gray-500">You haven't posted any jobs yet.</p>
          <Button className="mt-4" asChild>
            <Link href="/jobs/post">Post Your First Job</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

async function StaffDashboard() {
  //const applications = await getStaffApplications()
  const applications : any = []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Job Applications</h2>
        <Button asChild>
          <Link href="/jobs">Find Jobs</Link>
        </Button>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application : any) => (
            <Card key={application.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{application.job.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{application.job.jobType}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        application?.status === "pending"
                          ? "outline"
                          : application?.status === "accepted"
                            ? "success"
                            : application?.status === "rejected"
                              ? "destructive"
                              : "secondary"
                      }
                    >
                      {application.status}
                    </Badge>

                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/jobs/${application.jobId}`}>View Job</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-gray-500">You haven't applied to any jobs yet.</p>
          <Button className="mt-4" asChild>
            <Link href="/jobs">Browse Available Jobs</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

// Make sure the dashboard page is also async
export default async function DashboardPage() {

  const session = await auth()

  // Redirect if not logged in
  /*
  if (!session) {
    //redirect("/login?callbackUrl=/dashboard")
    redirect("/login?callbackUrl=/dashboard")
  }


  const isStaff = session.user.role === "STAFF"
  const isOrganizer = session.user.role === "ORGANIZER"
  */
    
  const isStaff = true
  const isOrganizer = false

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar session={session}/>
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Welcome, username!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {isOrganizer
                  ? "Manage your job postings and view applications from staff members."
                  : "Browse and apply for jobs that match your skills and availability."}
              </p>
            </CardContent>
          </Card>

          {isOrganizer && (
            <Suspense fallback={<div>Loading your jobs...</div>}>
              <OrganizerDashboard />
            </Suspense>
          )}

          {isStaff && (
            <Suspense fallback={<div>Loading your applications...</div>}>
              <StaffDashboard />
            </Suspense>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
