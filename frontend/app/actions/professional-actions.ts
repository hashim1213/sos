"use server"
import { apiClient } from "@/lib/api-client"
import { cookies } from "next/headers"

export async function registerProfessional(formData: FormData) {
  try {
    // Extract all form data
    const professionalData = {
      // Personal Information
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      province: formData.get("province"),
      postalcode: formData.get("postalcode"),
      // Professional Details
      jobTitle: formData.get("jobTitle"),
      hourlyRate: Number.parseFloat(formData.get("hourlyRate") as string) || 0,
      yearsExperience: formData.get("yearsExperience"),
      bio: formData.get("bio"),
      about: formData.get("about"),
      // Skills & Availability
      skills: formData.getAll("skills"),
      availableDays: getAvailableDays(formData),
      preferredHours: formData.get("preferredHours"),
      noticeRequired: formData.get("noticeRequired"),
      // Create account with STAFF role
      password: formData.get("password") || generateRandomPassword(),
      role: "STAFF",
    }

    // Register the professional
    const response = await apiClient("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(professionalData),
    })

    // Set cookies for authentication
    const cookieStore = await cookies()
    cookieStore.set("accessToken", response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    })

    cookieStore.set("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    // Return success
    console.error("Success registration:")
    return { success: true, user: response.user }
  } catch (error) {
    console.error("Professional registration error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to register professional",
    }
  }
}

// Helper function to get available days from form data
function getAvailableDays(formData: FormData): string[] {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  return days.filter((day) => formData.get(day) === "true")
}

// Generate a random password if user doesn't provide one
function generateRandomPassword(): string {
  const length = 12
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  let password = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }
  return password
}
