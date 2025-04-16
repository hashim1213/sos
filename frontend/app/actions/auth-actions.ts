"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { apiClient } from "@/lib/api-client"

// Login action
export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const callbackUrl = (formData.get("callbackUrl") as string) || "/dashboard"

  if (!email || !password) {
    return {
      error: "Email and password are required",
    }
  }

  try {
    const response = await apiClient("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    // Set cookies
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

    // Redirect to callback URL or dashboard
    redirect(callbackUrl)
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: error instanceof Error ? error.message : "Failed to login. Please check your credentials.",
    }
  }
}

// Logout action
export async function logout() {
  const cookieStore = await cookies()

  // Get the refresh token to revoke it on the server
  const refreshToken = cookieStore.get("refreshToken")?.value

  if (refreshToken) {
    try {
      // Attempt to revoke the token on the server
      await apiClient("/api/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      })
    } catch (error) {
      console.error("Error revoking token:", error)
    }
  }

  // Clear cookies regardless of server response
  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")

  // Redirect to home page
  redirect("/")
}

// Register action
export async function register(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string
  const callbackUrl = (formData.get("callbackUrl") as string) || "/dashboard"

  if (!firstName || !lastName || !email || !password || !role) {
    return {
      error: "All fields are required",
    }
  }

  try {
    const response = await apiClient("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password, role }),
    })

    // Set cookies
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

    // Redirect to callback URL or dashboard
    redirect(callbackUrl)
  } catch (error) {
    console.error("Registration error:", error)
    return {
      error: error instanceof Error ? error.message : "Failed to register. Please try again.",
    }
  }
}
