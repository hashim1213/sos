"use client"

import { useState } from "react"
import { applyForJob } from "@/app/actions/application-actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface JobApplicationFormProps {
  jobId: number
  onSuccess?: () => void
}

export function JobApplicationForm({ jobId, onSuccess }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      // Add the job ID to the form data
      formData.set("jobId", jobId.toString())

      await applyForJob(formData)

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully.",
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit application",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Textarea name="message" placeholder="Tell the organizer why you're a good fit for this job..." rows={4} />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting Application...
          </>
        ) : (
          "Apply for this Job"
        )}
      </Button>
    </form>
  )
}
