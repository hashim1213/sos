import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export async function auth() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  console.log("ACCESS TOKEN: " + accessToken)

  if (!accessToken) {
    return null
  }

  try {
    // TODO: Implement JWT verification here instead of just decoding
    // const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    const decoded = JSON.parse(Buffer.from(accessToken.split(".")[1], "base64").toString()) as {
      userId: string
      email: string
      role: string
      firstName: string
      lastName: string
    }

    return {
      user: {
        id: decoded.userId,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        role: decoded.role,
      },
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function getAuthToken() {
  var cookieStore = await cookies()
  var res = cookieStore.get("accessToken")
  return res
}

export async function requireAuth(redirectTo: string) {
  return async () => {
    const session = await auth()
    if (!session) {
      redirect(redirectTo)
    }
    return session
  }
}

export async function setAuthToken(
  token: string,
  options?: { expires?: Date; secure?: boolean; httpOnly?: boolean; path?: string },
) {
  const cookieStore = await cookies()

  cookieStore.set("accessToken", token, {
    expires: options?.expires || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default: 7 days
    secure: options?.secure !== undefined ? options.secure : process.env.NODE_ENV === "production",
    httpOnly: options?.httpOnly !== undefined ? options.httpOnly : true,
    path: options?.path || "/",
  })
}

export async function clearAuthToken() {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
}
/*
export function createToken(user: User): string {
  // This is a simplified example - in production, use a proper JWT library
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64")
  const payload = Buffer.from(
    JSON.stringify({
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    }),
  ).toString("base64")

  // In production, use a proper JWT library to sign the token
  // This is just for demonstration
  const signature = "DUMMY_SIGNATURE"

  return `${header}.${payload}.${signature}`
}
*/

/*
export async function useAuth() {
  const router = useRouter()

  const logout = () => {
    clearAuthToken()
    router.push("/")
  }

  const isAuthenticated = () => {
    return !!getAuthToken()
  }

  return {
    logout,
    isAuthenticated,
  }
}
  */