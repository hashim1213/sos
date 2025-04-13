"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProfessionalsList } from "@/components/professionals-list"
import { ProfessionalFilters } from "@/components/professional-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { FilterValues } from "@/components/professional-filters"

export default function ProfessionalsPage() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [filters, setFilters] = useState<FilterValues | undefined>(undefined)

  // Initialize with search query from URL
  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam)
    }
  }, [queryParam])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The search query is already set via the input onChange
  }

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters)
  }

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

            <form onSubmit={handleSearch} className="mt-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search by name, job title, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Search Professionals
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            <ProfessionalFilters onFiltersChange={handleFiltersChange} />
            <ProfessionalsList searchQuery={searchQuery} filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
