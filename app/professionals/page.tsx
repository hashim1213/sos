import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfessionalsList } from "@/components/professionals-list"
import { ProfessionalFilters } from "@/components/professional-filters"

export default function ProfessionalsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-black to-gray-900 py-12 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold md:text-4xl">Find Event Professionals</h1>
            <p className="mt-4 max-w-2xl text-gray-300">
              Browse our network of verified event professionals. Filter by skill, location, and availability to find
              the perfect match for your event.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            <ProfessionalFilters />
            <ProfessionalsList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
