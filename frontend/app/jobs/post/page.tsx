import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { JobPostingForm } from "@/components/job-posting-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default async function PostJobPage() {
  const session = await auth()

  // Redirect if not logged in or not an organizer

  if (!session || session.user.role !== "ORGANIZER") {
    redirect("/login")
  }
    
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar session={session}/>
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-6 text-2xl font-bold">Post a New Job</h1>
            <div className="rounded-lg border p-6 shadow-sm">
              <JobPostingForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
