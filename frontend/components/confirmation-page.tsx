"use client"

import { Button } from "@/components/ui/button"
import type { StaffMember, JobDetails } from "@/lib/types"
import { Calendar, Clock, DollarSign, MapPin, User } from "lucide-react"
import { format } from "date-fns"

interface ConfirmationPageProps {
  jobDetails: JobDetails
  selectedStaff: StaffMember
  onConfirm: () => void
  onBack: () => void
  onStartOver: () => void
}

export function ConfirmationPage({ jobDetails, selectedStaff, onConfirm, onBack, onStartOver }: ConfirmationPageProps) {
  // Calculate total cost
  const hours = Number.parseInt(jobDetails.duration)
  const hourlyRate = selectedStaff.hourlyRate
  const subtotal = hours * hourlyRate
  const serviceFee = subtotal * 0.15 // 15% service fee
  const total = subtotal + serviceFee

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-primary">Confirm Booking</h2>
        <p className="mb-6 text-gray-500">Please review the details of your booking before confirming.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-medium">Job Details</h3>
          <div className="rounded-lg border p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-sm text-gray-500">
                    {format(jobDetails.date, "PPP")} at {jobDetails.startTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm text-gray-500">
                    {jobDetails.duration} hour{Number.parseInt(jobDetails.duration) > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-gray-500">{jobDetails.fullAddress}</p>
                </div>
              </div>

              {jobDetails.description && (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Description</p>
                    <p className="text-sm text-gray-500">{jobDetails.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Staff Details</h3>
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                <img
                  src={selectedStaff.avatar || "/placeholder.svg"}
                  alt={selectedStaff.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">{selectedStaff.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedStaff.jobTitle} • {selectedStaff.yearsExperience} years experience
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-sm">{selectedStaff.bio}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">${selectedStaff.hourlyRate}/hour</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-4 font-medium">Payment Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p>Hourly Rate</p>
            <p>${hourlyRate.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Hours</p>
            <p>× {hours}</p>
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>Service Fee (15%)</p>
            <p>${serviceFee.toFixed(2)}</p>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-medium">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mr-2">
            Back
          </Button>
          <Button variant="ghost" onClick={onStartOver}>
            Start Over
          </Button>
        </div>
        <Button onClick={onConfirm} className="bg-primary hover:bg-primary/90">
          Confirm Booking
        </Button>
      </div>
    </div>
  )
}
