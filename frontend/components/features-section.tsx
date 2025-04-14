import { Calendar, Clock, CreditCard, Shield, Star, Users } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why Choose StaffOnShift</h2>
          <p className="mt-4 text-lg text-gray-500">
            We make it easy to find qualified staff for your events or find flexible work opportunities.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Instant Booking</h3>
            <p className="text-gray-500">Find and book qualified staff within minutes, not days.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Verified Professionals</h3>
            <p className="text-gray-500">All staff are background-checked and skill-verified.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Rated & Reviewed</h3>
            <p className="text-gray-500">See ratings and reviews to find the perfect match for your event.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Secure Payments</h3>
            <p className="text-gray-500">Hassle-free payment processing with protection for both parties.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Flexible Scheduling</h3>
            <p className="text-gray-500">Find work that fits your schedule or staff when you need them.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Specialized Categories</h3>
            <p className="text-gray-500">From bartenders to security, find staff for every event need.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
