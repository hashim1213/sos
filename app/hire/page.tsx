"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JobDetailsForm } from "@/components/job-details-form"
import { StaffListing } from "@/components/staff-listing"
import { ConfirmationPage } from "@/components/confirmation-page"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle2 } from "lucide-react"
import type { StaffMember, JobDetails } from "@/lib/types"
import { generateStaffMembers } from "@/lib/dummy-data"

export default function HirePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null)
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)

  const handleJobDetailsSubmit = (details: JobDetails) => {
    setJobDetails(details)
    // Generate dummy staff members based on job type
    setStaffMembers(generateStaffMembers(details.jobType))
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handleStaffSelect = (staff: StaffMember) => {
    setSelectedStaff(staff)
    setStep(3)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleConfirm = () => {
    // In a real app, this would submit the booking to the backend
    setIsBookingConfirmed(true)
    window.scrollTo(0, 0)
  }

  const handleStartOver = () => {
    setStep(1)
    setJobDetails(null)
    setStaffMembers([])
    setSelectedStaff(null)
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 md:px-6">
          {!isBookingConfirmed ? (
            <>
              <div className="mb-8">
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-primary">Apply to Hire Staff Now</h1>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 1 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      1
                    </div>
                    <div className={`h-1 w-8 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 2 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      2
                    </div>
                    <div className={`h-1 w-8 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 3 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      3
                    </div>
                  </div>
                </div>
              </div>

              <Card className="mx-auto max-w-4xl border-primary/10 shadow-lg">
                <CardContent className="p-6">
                  {step === 1 && <JobDetailsForm onSubmit={handleJobDetailsSubmit} />}

                  {step === 2 && jobDetails && (
                    <StaffListing
                      staffMembers={staffMembers}
                      jobDetails={jobDetails}
                      onSelect={handleStaffSelect}
                      onBack={handleBack}
                    />
                  )}

                  {step === 3 && jobDetails && selectedStaff && (
                    <ConfirmationPage
                      jobDetails={jobDetails}
                      selectedStaff={selectedStaff}
                      onConfirm={handleConfirm}
                      onBack={handleBack}
                      onStartOver={handleStartOver}
                    />
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">Shifter has confirmed booking!</h2>
              <p className="mt-4 text-gray-600">
                Your booking with {selectedStaff?.name} has been successfully confirmed for{" "}
                {jobDetails?.date.toLocaleDateString()} at {jobDetails?.startTime}.
              </p>
              <p className="mt-2 text-gray-600">
                We've sent a confirmation email with all the details to your registered email address. The staff member
                has been notified and will contact you shortly to discuss any specific requirements.
              </p>
              <div className="mt-8 space-y-4">
                <Button onClick={() => router.push("/")} className="w-full bg-primary hover:bg-primary/90 sm:w-auto">
                  Return to Home
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsBookingConfirmed(false)
                    handleStartOver()
                  }}
                  className="w-full sm:w-auto"
                >
                  Book Another Staff
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
