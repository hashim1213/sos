import { Suspense } from "react"
import { getOpenJobs } from "@/app/actions/job-actions"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { auth } from "@/lib/auth"

async function JobsList() {
  const jobs = await getOpenJobs()

  //<Button asChild>
  //<Link href="/jobs/post">Post a Job</Link> 
  //</Button>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Available Jobs</h1>
          <p className="text-gray-500">{jobs.length} jobs found</p>
        </div>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-gray-500">No jobs available at the moment.</p>
          <p className="mt-2 text-sm text-gray-400">Check back later or post a job if you're an organizer.</p>
        </div>
      )}
    </div>
  )
}

export default async function JobsPage() {
  const session = await auth()
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar session={session}/>
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <Suspense fallback={<div>Loading jobs...</div>}>
            <JobsList />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
