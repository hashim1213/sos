import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-primary py-20 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-white/90">
            Join thousands of event organizers and staff members already using StaffOnSite
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-gray-100">
              <Link href="/hire">I Need Staff</Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100" asChild>
              <Link href="/apply">I Want to Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
