import Link from "next/link"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { JobWithOrganizer } from "@/lib/types"

interface JobCardProps {
  job: JobWithOrganizer
}

export function JobCard({ job }: JobCardProps) {
  // Format the date
  const formattedDate = format(new Date(job.date), "MMM d, yyyy")

  // Calculate total pay
  const totalPay = job.hourlyRate * job.duration

  // Get organizer name
  const organizerName = job.organizer.companyName || `${job.organizer.firstName} ${job.organizer.lastName}`

  // Get initials for avatar fallback
  const initials = job.organizer.firstName.charAt(0) + job.organizer.lastName.charAt(0)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-[1fr_auto]">
          <div className="flex gap-4 p-4">
            <div className="hidden sm:block">
              <Avatar className="h-12 w-12">
                <AvatarImage src={job.organizer.avatar || ""} alt={organizerName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    <Link href={`/jobs/${job.id}`} className="hover:text-primary">
                      {job.title}
                    </Link>
                  </h3>
                  <Badge variant="outline" className="capitalize">
                    {job.jobType}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">Posted by {organizerName}</p>
              </div>

              {job.description && <p className="text-sm line-clamp-2">{job.description}</p>}

              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="mr-1 h-3 w-3" />
                  {job.startTime} • {job.duration}h
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-1 h-3 w-3" />
                  {job.location}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 bg-gray-50 p-4 text-center">
            <div>
              <p className="text-2xl font-bold">${job.hourlyRate.toFixed(2)}</p>
              <p className="text-xs text-gray-500">per hour</p>
            </div>
            <p className="text-sm font-medium">${totalPay.toFixed(2)} total</p>
            <Button asChild className="w-full">
              <Link href={`/jobs/${job.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
