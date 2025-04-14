"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StaffCard } from "@/components/staff-card"
import type { StaffMember, JobDetails } from "@/lib/types"
import { Calendar, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"

interface StaffListingProps {
  staffMembers: StaffMember[]
  jobDetails: JobDetails
  onSelect: (staff: StaffMember) => void
  onBack: () => void
}

export function StaffListing({ staffMembers, jobDetails, onSelect, onBack }: StaffListingProps) {
  const [sortBy, setSortBy] = useState("rating")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredStaff, setFilteredStaff] = useState(staffMembers)

  // Sort and filter staff members
  const sortAndFilterStaff = () => {
    let result = [...staffMembers]

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (staff) =>
          staff.name.toLowerCase().includes(term) ||
          staff.bio.toLowerCase().includes(term) ||
          staff.skills.some((skill) => skill.toLowerCase().includes(term)),
      )
    }

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "hourlyRate":
        result.sort((a, b) => a.hourlyRate - b.hourlyRate)
        break
      case "experience":
        result.sort((a, b) => b.yearsExperience - a.yearsExperience)
        break
    }

    setFilteredStaff(result)
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value)
    setTimeout(sortAndFilterStaff, 0)
  }

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setTimeout(sortAndFilterStaff, 0)
  }

  // Initial sort and filter on component mount
  useState(() => {
    sortAndFilterStaff()
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-primary">Available Staff</h2>
        <p className="mb-6 text-gray-500">
          Select a staff member for your event. You can sort and filter to find the perfect match.
        </p>
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-medium">Job Summary</h3>
        <div className="grid gap-2 text-sm md:grid-cols-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {format(jobDetails.date, "PPP")}, {jobDetails.startTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              {jobDetails.duration} hour{Number.parseInt(jobDetails.duration) > 1 ? "s" : ""} at $
              {jobDetails.hourlyRate}/hr
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{jobDetails.fullAddress}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by name, skills, or keywords..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full md:w-48">
          <Label htmlFor="sort">Sort By</Label>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="hourlyRate">Lowest Price</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredStaff.length > 0 ? (
          filteredStaff.map((staff) => <StaffCard key={staff.id} staff={staff} onSelect={() => onSelect(staff)} />)
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-gray-500">No staff members match your search criteria.</p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  )
}
