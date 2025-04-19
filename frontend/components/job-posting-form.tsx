"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createJob } from "@/app/actions/job-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function JobPostingForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [jobType, setJobType] = useState("")
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      // Add the date to the form data
      if (date) {
        formData.set("date", format(date, "yyyy-MM-dd"))
      }

      const result = await createJob(formData)

      toast({
        title: "Job Posted Successfully",
        description: "Your job has been posted and is now visible to staff members.",
      })

      // Redirect to the job details page
      router.push(`/jobs/${result.job.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to post job",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" name="title" required placeholder="e.g., Bartender for Corporate Event" />
        </div>

        <div>
          <Label htmlFor="jobType">Job Type</Label>
          <Select name="jobType" value={jobType} onValueChange={setJobType} required>
            <SelectTrigger>
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
        </div>

        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the job responsibilities and requirements..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" required placeholder="e.g., 123 Main St, Toronto, ON" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
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
          </div>

          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Select name="startTime" value={startTime} onValueChange={setStartTime} required>
              <SelectTrigger>
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
          </div>

          <div>
            <Label htmlFor="duration">Duration (hours)</Label>
            <Select name="duration" value={duration} onValueChange={setDuration} required>
              <SelectTrigger>
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
          </div>
        </div>

        <div>
          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
          <Input id="hourlyRate" name="hourlyRate" type="number" min="15" step="0.01" required placeholder="25.00" />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Posting Job...
          </>
        ) : (
          "Post Job"
        )}
      </Button>
    </form>
  )
}
