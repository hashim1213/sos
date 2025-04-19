import type React from "react"

import { useState, useEffect } from "react"
import { redirect, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrganizerCard } from "@/components/organizer-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { mockOrganizers } from "@/lib/mock-organizers"
import { auth } from "@/lib/auth"

export default async function OrganizersPage() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [sortBy, setSortBy] = useState("rating")
  const [organizers, setOrganizers] = useState(mockOrganizers)
  const [filteredOrganizers, setFilteredOrganizers] = useState(mockOrganizers)
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([])

  // Get unique event types from all organizers
  const allEventTypes = Array.from(new Set(mockOrganizers.flatMap((organizer) => organizer.eventTypes))).sort()

  // Filter and sort organizers
  useEffect(() => {
    let results = [...mockOrganizers]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (organizer) =>
          organizer.name.toLowerCase().includes(query) ||
          organizer.companyName.toLowerCase().includes(query) ||
          organizer.bio.toLowerCase().includes(query) ||
          organizer.eventTypes.some((type) => type.toLowerCase().includes(query)),
      )
    }

    // Filter by selected event types
    if (selectedEventTypes.length > 0) {
      results = results.filter((organizer) => selectedEventTypes.some((type) => organizer.eventTypes.includes(type)))
    }

    // Sort results
    switch (sortBy) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        results.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredOrganizers(results)
  }, [searchQuery, sortBy, selectedEventTypes])

  // Initialize with search query from URL
  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam)
    }
  }, [queryParam])

  const handleEventTypeToggle = (type: string) => {
    setSelectedEventTypes((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The filtering is handled by the useEffect
  }

  const clearFilters = () => {
    setSelectedEventTypes([])
    setSearchQuery("")
    setSortBy("rating")
  }

  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar session={session}/>
      <main className="flex-1">
        <div className="bg-gradient-to-r from-black to-gray-900 py-12 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold md:text-4xl">Find Event Organizers</h1>
            <p className="mt-4 max-w-2xl text-gray-300">
              Browse our network of experienced event organizers. From weddings to corporate events, find the perfect
              planner for your needs.
            </p>

            <form onSubmit={handleSearch} className="mt-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search by name, company, or event type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Search Organizers
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-[250px_1fr]">
            {/* Filters */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Filters</h2>
                <p className="text-sm text-gray-500">Refine your search results</p>
              </div>

              <div>
                <Label className="mb-2 block">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Event Types</Label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {allEventTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedEventTypes.includes(type)}
                        onCheckedChange={() => handleEventTypeToggle(type)}
                      />
                      <label htmlFor={`type-${type}`} className="text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" onClick={clearFilters} className="w-full">
                Clear Filters
              </Button>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Available Organizers</h2>
                  <p className="text-sm text-gray-500">{filteredOrganizers.length} organizers found</p>
                </div>
              </div>

              {filteredOrganizers.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrganizers.map((organizer) => (
                    <OrganizerCard key={organizer.id} organizer={organizer} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <p className="text-gray-500">No organizers match your search criteria.</p>
                  <Button variant="link" onClick={clearFilters} className="mt-2">
                    Clear filters and try again
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
