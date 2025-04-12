import { Star } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Users Say</h2>
          <p className="mt-4 text-lg text-gray-500">Hear from event organizers and staff who have used StaffOnSite</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="mb-4 text-gray-600">
              "StaffOnSite saved our charity gala! With just 48 hours notice, we found 5 professional servers and a
              bartender. The quality was outstanding."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                <img src="/placeholder.svg?height=40&width=40" alt="Sarah J." className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-medium">Sarah J.</p>
                <p className="text-sm text-gray-500">Event Planner</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="mb-4 text-gray-600">
              "As a bartender, I love the flexibility. I can pick up shifts that work with my schedule, and the payment
              process is seamless and quick."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                <img src="/placeholder.svg?height=40&width=40" alt="Marcus T." className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-medium">Marcus T.</p>
                <p className="text-sm text-gray-500">Bartender</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="mb-4 text-gray-600">
              "We use StaffOnSite for all our corporate events now. The verification process gives us confidence in who
              we're hiring, and the quality is consistent."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Jennifer L."
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Jennifer L.</p>
                <p className="text-sm text-gray-500">Corporate Events Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
