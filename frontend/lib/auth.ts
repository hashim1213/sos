import { cookies } from "next/headers"
import { apiClient } from "./api-client"

// Simple function to get the current session
export async function auth() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return null
    }

    // Fetch the current user
    const user = await apiClient("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return {
      user,
    }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}
