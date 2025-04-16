import { Suspense } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface LoginPageProps {
  searchParams: {
    callbackUrl?: string
  }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  // Check if user is already logged in
  const resolvedSearchParams = await Promise.resolve(searchParams)

  const session = await auth()

  if (session) {
    redirect(resolvedSearchParams.callbackUrl || "/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-md">
            <h1 className="mb-6 text-2xl font-bold text-center">Sign In</h1>
            <div className="rounded-lg border p-6 shadow-sm">
              <Suspense fallback={<div>Loading...</div>}>
                <LoginForm callbackUrl={resolvedSearchParams.callbackUrl} />
              </Suspense>
            </div>
            <p className="mt-4 mb-5 text-center text-sm text-gray-500">
              Don't have an account?{" "}
            </p>
            <div className="flex w-full justify-between min-[400px]:flex-row">
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/hire">Apply to Hire Staff Now</Link>
              </Button>
              <Button size="sm" variant="secondary" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link href="/register-professional">Apply as Staff</Link>
              </Button>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
