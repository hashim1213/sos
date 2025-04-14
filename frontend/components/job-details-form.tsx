"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { JobDetails } from "@/lib/types"

interface JobDetailsFormProps {
  onSubmit: (details: JobDetails) => void
}

export function JobDetailsForm({ onSubmit }: JobDetailsFormProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    jobType: "",
    startTime: "",
    duration: "",
    hourlyRate: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    if (!formData.jobType) newErrors.jobType = "Job type is required"
    if (!date) newErrors.date = "Date is required"
    if (!formData.startTime) newErrors.startTime = "Start time is required"
    if (!formData.duration) newErrors.duration = "Duration is required"
    if (!formData.hourlyRate) newErrors.hourlyRate = "Hourly rate is required"
    else if (isNaN(Number(formData.hourlyRate)) || Number(formData.hourlyRate) <= 0) {
      newErrors.hourlyRate = "Please enter a valid hourly rate"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const jobDetails: JobDetails = {
        ...formData,
        date: date!,
        fullAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      }
      onSubmit(jobDetails)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-primary">Job Details</h2>
        <p className="mb-6 text-gray-500">
          Tell us about the job you need help with. We'll match you with qualified staff.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="jobType">Job Type</Label>
          <Select value={formData.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
            <SelectTrigger id="jobType" className={cn(errors.jobType && "border-red-500")}>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bartender">Bartender</SelectItem>
              <SelectItem value="server">Server/Waiter</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="hostess">Host/Hostess</SelectItem>
              <SelectItem value="chef">Chef/Cook</SelectItem>
              <SelectItem value="cleaner">Cleaning Staff</SelectItem>
              <SelectItem value="technician">AV Technician</SelectItem>
            </SelectContent>
          </Select>
          {errors.jobType && <p className="mt-1 text-sm text-red-500">{errors.jobType}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    errors.date && "border-red-500",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
          </div>

          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Select value={formData.startTime} onValueChange={(value) => handleSelectChange("startTime", value)}>
              <SelectTrigger id="startTime" className={cn(errors.startTime && "border-red-500")}>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }).map((_, i) => {
                  const hour = i % 12 || 12
                  const ampm = i < 12 ? "AM" : "PM"
                  const value = `${hour}:00 ${ampm}`
                  return (
                    <SelectItem key={i} value={value}>
                      {value}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {errors.startTime && <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="duration">Duration (hours)</Label>
            <Select value={formData.duration} onValueChange={(value) => handleSelectChange("duration", value)}>
              <SelectTrigger id="duration" className={cn(errors.duration && "border-red-500")}>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }).map((_, i) => {
                  const hours = i + 1
                  return (
                    <SelectItem key={i} value={hours.toString()}>
                      {hours} hour{hours > 1 ? "s" : ""}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
          </div>

          <div>
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              min="1"
              placeholder="25"
              value={formData.hourlyRate}
              onChange={handleChange}
              className={cn(errors.hourlyRate && "border-red-500")}
            />
            {errors.hourlyRate && <p className="mt-1 text-sm text-red-500">{errors.hourlyRate}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Main St"
            value={formData.address}
            onChange={handleChange}
            className={cn(errors.address && "border-red-500")}
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="New York"
              value={formData.city}
              onChange={handleChange}
              className={cn(errors.city && "border-red-500")}
            />
            {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              placeholder="NY"
              value={formData.state}
              onChange={handleChange}
              className={cn(errors.state && "border-red-500")}
            />
            {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              placeholder="10001"
              value={formData.zipCode}
              onChange={handleChange}
              className={cn(errors.zipCode && "border-red-500")}
            />
            {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the job responsibilities and any specific requirements..."
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90">
          Find Available Staff
        </Button>
      </div>
    </form>
  )
}
