"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function ProfessionalFilters() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [priceRange, setPriceRange] = useState([15, 100])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Filters</h2>
        <p className="text-sm text-gray-500">Refine your search to find the perfect professional</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search by name or skill..." />
        </div>

        <div>
          <Label>Job Type</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="bartender" />
              <label htmlFor="bartender" className="text-sm">
                Bartender
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="server" />
              <label htmlFor="server" className="text-sm">
                Server
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="security" />
              <label htmlFor="security" className="text-sm">
                Security
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hostess" />
              <label htmlFor="hostess" className="text-sm">
                Host/Hostess
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="chef" />
              <label htmlFor="chef" className="text-sm">
                Chef
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="technician" />
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
              defaultValue={[15, 100]}
              max={200}
              min={15}
              step={5}
              value={priceRange}
              onValueChange={setPriceRange}
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
              <Checkbox id="beginner" />
              <label htmlFor="beginner" className="text-sm">
                Beginner (0-1 years)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="intermediate" />
              <label htmlFor="intermediate" className="text-sm">
                Intermediate (1-3 years)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="experienced" />
              <label htmlFor="experienced" className="text-sm">
                Experienced (3-5 years)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="expert" />
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
              <Checkbox id="4plus" />
              <label htmlFor="4plus" className="text-sm">
                4+ Stars
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="3plus" />
              <label htmlFor="3plus" className="text-sm">
                3+ Stars
              </label>
            </div>
          </div>
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  )
}
