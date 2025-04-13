"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Star } from "lucide-react"
import { mockProfessionals } from "@/lib/mock-professionals"
import type { Professional } from "@/lib/types"
import type { FilterValues } from "@/components/professional-filters"

interface ProfessionalsListProps {
  searchQuery: string
  filters?: FilterValues
}

export function ProfessionalsList({ searchQuery, filters }: ProfessionalsListProps) {
  const [sortBy, setSortBy] = useState("rating")
  const [professionals, setProfessionals] = useState<Professional[]>(mockProfessionals)

  // Apply filters and search whenever they change
  useEffect(() => {
    let filtered = [...mockProfessionals]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (prof) =>
          prof.name.toLowerCase().includes(query) ||
          prof.jobTitle.toLowerCase().includes(query) ||
          prof.bio.toLowerCase().includes(query) ||
          prof.skills.some((skill) => skill.toLowerCase().includes(query)),
      )
    }

    // Apply filters if they exist
    if (filters) {
      // Job type filter
      if (filters.jobTypes.length > 0) {
        filtered = filtered.filter((prof) => {
          const jobTitle = prof.jobTitle.toLowerCase()
          return filters.jobTypes.some((type) => jobTitle.includes(type.toLowerCase()))
        })
      }

      // Price range filter
      filtered = filtered.filter(
        (prof) => prof.hourlyRate >= filters.priceRange[0] && prof.hourlyRate <= filters.priceRange[1],
      )

      // Date filter - in a real app, you would check availability for the specific date
      if (filters.date) {
        filtered = filtered.filter((prof) => {
          // Check if the professional has any availability
          return Object.values(prof.availability.schedule).some((hours : any) => hours !== "")
        })
      }

      // Experience level filter
      if (filters.experienceLevels.length > 0) {
        filtered = filtered.filter((prof) => {
          if (filters.experienceLevels.includes("beginner") && prof.yearsExperience <= 1) return true
          if (
            filters.experienceLevels.includes("intermediate") &&
            prof.yearsExperience > 1 &&
            prof.yearsExperience <= 3
          )
            return true
          if (filters.experienceLevels.includes("experienced") && prof.yearsExperience > 3 && prof.yearsExperience <= 5)
            return true
          if (filters.experienceLevels.includes("expert") && prof.yearsExperience > 5) return true
          return false
        })
      }

      // Rating filter
      if (filters.ratings.length > 0) {
        filtered = filtered.filter((prof) => {
          if (filters.ratings.includes("4plus") && prof.rating >= 4) return true
          if (filters.ratings.includes("3plus") && prof.rating >= 3) return true
          return false
        })
      }
    }

    // Apply sorting
    sortProfessionals(sortBy, filtered)
  }, [searchQuery, filters, sortBy])

  // Sort professionals based on selected option
  const sortProfessionals = (value: string, professionalsToSort = professionals) => {
    setSortBy(value)
    const sorted = [...professionalsToSort]

    switch (value) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "hourlyRate":
        sorted.sort((a, b) => a.hourlyRate - b.hourlyRate)
        break
      case "experience":
        sorted.sort((a, b) => b.yearsExperience - a.yearsExperience)
        break
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setProfessionals(sorted)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">Available Professionals</h2>
          <p className="text-sm text-gray-500">{professionals.length} professionals found</p>
        </div>
        <div className="w-full sm:w-48">
          <Select value={sortBy} onValueChange={sortProfessionals}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="hourlyRate">Lowest Price</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {professionals.length > 0 ? (
          professionals.map((professional) => (
            <Card key={professional.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-[1fr_auto]">
                  <div className="flex gap-4 p-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
                      <img
                        src={professional.avatar || "/placeholder.svg"}
                        alt={professional.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">
                            <Link href={`/professionals/${professional.id}`} className="hover:text-primary">
                              {professional.name}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{professional.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {professional.jobTitle} • {professional.yearsExperience} years experience
                        </p>
                      </div>
                      <p className="text-sm">{professional.bio}</p>
                      <div className="flex flex-wrap gap-1">
                        {professional.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {professional.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{professional.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {professional.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {professional.availability.nextAvailable}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {professional.availability.preferredHours}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 bg-gray-50 p-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">${professional.hourlyRate - 10} - ${professional.hourlyRate}</p>
                      <p className="text-xs text-gray-500">per hour</p>
                    </div>
                    <Button asChild className="bg-red-600 hover:bg-red-700">
                      <Link href={`/professionals/${professional.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-gray-500">No professionals match your search criteria.</p>
            <p className="mt-2 text-sm text-gray-400">
              Try adjusting your filters or search terms to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
