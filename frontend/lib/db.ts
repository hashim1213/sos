// Simple API client for database operations
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Helper function to execute database operations via API
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const response = await fetch(`${API_URL}/db/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, params }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Database query failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Export a simple db object with common operations
export const db = {
  // Execute a query and return all results
  query: executeQuery,

  // Execute a query and return the first result
  queryOne: async (query: string, params: any[] = []) => {
    const results = await executeQuery(query, params)
    return results.length > 0 ? results[0] : null
  },

  // Insert data and return the inserted row
  insert: async (table: string, data: Record<string, any>) => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ")

    const query = `
      INSERT INTO "${table}" (${keys.map((k) => `"${k}"`).join(", ")})
      VALUES (${placeholders})
      RETURNING *
    `

    const results = await executeQuery(query, values)
    return results[0]
  },

  // Update data and return the updated row
  update: async (table: string, id: string | number, data: Record<string, any>) => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const setClause = keys.map((k, i) => `"${k}" = $${i + 1}`).join(", ")

    const query = `
      UPDATE "${table}"
      SET ${setClause}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `

    const results = await executeQuery(query, [...values, id])
    return results[0]
  },

  // Delete a row and return the deleted row
  delete: async (table: string, id: string | number) => {
    const query = `
      DELETE FROM "${table}"
      WHERE id = $1
      RETURNING *
    `

    const results = await executeQuery(query, [id])
    return results[0]
  },
}
