"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export type FilterValues = {
  jobTypes: string[]
  priceRange: [number, number]
  date: Date | undefined
  experienceLevels: string[]
  ratings: string[]
}

interface ProfessionalFiltersProps {
  onFiltersChange: (filters: FilterValues) => void
}

export function ProfessionalFilters({ onFiltersChange }: ProfessionalFiltersProps) {
  // Local state for form values
  const [jobTypes, setJobTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([15, 200])
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [experienceLevels, setExperienceLevels] = useState<string[]>([])
  const [ratings, setRatings] = useState<string[]>([])

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    if (checked) {
      setJobTypes([...jobTypes, jobType])
    } else {
      setJobTypes(jobTypes.filter((type) => type !== jobType))
    }
  }

  const handleExperienceLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setExperienceLevels([...experienceLevels, level])
    } else {
      setExperienceLevels(experienceLevels.filter((l) => l !== level))
    }
  }

  const handleRatingChange = (rating: string, checked: boolean) => {
    if (checked) {
      setRatings([...ratings, rating])
    } else {
      setRatings(ratings.filter((r) => r !== rating))
    }
  }

  const handleApplyFilters = () => {
    onFiltersChange({
      jobTypes,
      priceRange,
      date,
      experienceLevels,
      ratings,
    })
  }

  const handleResetFilters = () => {
    setJobTypes([])
    setPriceRange([15, 200])
    setDate(undefined)
    setExperienceLevels([])
    setRatings([])

    onFiltersChange({
      jobTypes: [],
      priceRange: [15, 200],
      date: undefined,
      experienceLevels: [],
      ratings: [],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Filters</h2>
        <p className="text-sm text-gray-500">Refine your search to find the perfect professional</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Job Type</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bartender"
                checked={jobTypes.includes("bartender")}
                onCheckedChange={(checked) => handleJobTypeChange("bartender", checked as boolean)}
              />
              <label htmlFor="bartender" className="text-sm">
                Bartender
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="server"
                checked={jobTypes.includes("server")}
                onCheckedChange={(checked) => handleJobTypeChange("server", checked as boolean)}
              />
              <label htmlFor="server" className="text-sm">
                Server
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="security"
                checked={jobTypes.includes("security")}
                onCheckedChange={(checked) => handleJobTypeChange("security", checked as boolean)}
              />
              <label htmlFor="security" className="text-sm">
                Security
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hostess"
                checked={jobTypes.includes("hostess")}
                onCheckedChange={(checked) => handleJobTypeChange("hostess", checked as boolean)}
              />
              <label htmlFor="hostess" className="text-sm">
                Host/Hostess
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="chef"
                checked={jobTypes.includes("chef")}
                onCheckedChange={(checked) => handleJobTypeChange("chef", checked as boolean)}
              />
              <label htmlFor="chef" className="text-sm">
                Chef
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="technician"
                checked={jobTypes.includes("technician")}
                onCheckedChange={(checked) => handleJobTypeChange("technician", checked as boolean)}
              />
              <label htmlFor="technician" className="text-sm">
                AV Technician
              </label>
            </div>
          </div>
        </div>

        <div>
          <Label>Hourly Rate</Label>
          <div className="mt-6 px-2">
            <Slider
              defaultValue={[15, 200]}
              max={200}
              min={15}
              step={5}
              value={priceRange}
              onValueChange={(value : any) => setPriceRange(value as [number, number])}
            />
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Availability Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("mt-2 w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Experience Level</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="beginner"
                checked={experienceLevels.includes("beginner")}
                onCheckedChange={(checked) => handleExperienceLevelChange("beginner", checked as boolean)}
              />
              <label htmlFor="beginner" className="text-sm">
                Beginner (0-1 years)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="intermediate"
                checked={experienceLevels.includes("intermediate")}
                onCheckedChange={(checked) => handleExperienceLevelChange("intermediate", checked as boolean)}
              />
              <label htmlFor="intermediate" className="text-sm">
                Intermediate (1-3 years)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="experienced"
                checked={experienceLevels.includes("experienced")}
                onCheckedChange={(checked) => handleExperienceLevelChange("experienced", checked as boolean)}
              />
              <label htmlFor="experienced" className="text-sm">
                Experienced (3-5 years)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="expert"
                checked={experienceLevels.includes("expert")}
                onCheckedChange={(checked) => handleExperienceLevelChange("expert", checked as boolean)}
              />
              <label htmlFor="expert" className="text-sm">
                Expert (5+ years)
              </label>
            </div>
          </div>
        </div>

        <div>
          <Label>Rating</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="4plus"
                checked={ratings.includes("4plus")}
                onCheckedChange={(checked) => handleRatingChange("4plus", checked as boolean)}
              />
              <label htmlFor="4plus" className="text-sm">
                4+ Stars
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="3plus"
                checked={ratings.includes("3plus")}
                onCheckedChange={(checked) => handleRatingChange("3plus", checked as boolean)}
              />
              <label htmlFor="3plus" className="text-sm">
                3+ Stars
              </label>
            </div>
          </div>
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="outline" className="w-full" onClick={handleResetFilters}>
          Reset
        </Button>
      </div>
    </div>
  )
}
