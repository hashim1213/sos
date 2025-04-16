import type { Request, Response, NextFunction } from "express"
import type { UserRole } from "@prisma/client"
import authService from "../services/authService"
import type { RequestWithUser } from "../types"

/**
 * Middleware to authenticate requests using JWT
 */
export function authenticate(req: Request, res: Response, next: NextFunction): Response | void {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" })
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const decoded = authService.verifyToken(token)

    // Add user data to request
    ;(req as RequestWithUser).user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

/**
 * Middleware to check if user has required role
 */
export function authorize(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const userReq = req as RequestWithUser

    if (!userReq.user) {
      return res.status(401).json({ message: "Authentication required" })
    }

    if (!roles.includes(userReq.user.role)) {
      return res.status(403).json({ message: "Access denied" })
    }

    next()
  }
}
