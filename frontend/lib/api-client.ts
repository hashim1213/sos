// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081"

// API client
export async function apiClient(endpoint: string, options: RequestInit = {}) {
  try {
    console.log(API_URL)
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error("1 - API request failed:", error.code)
      throw new Error(error.message || response.statusText)
    }

    return await response.json()
  } catch (error) {
    console.error("2 - API request failed:", error)
    throw error
  }
}
