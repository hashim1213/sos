import type { UserRole } from "@prisma/client"
import type { Request } from "express"

export interface RegisterUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole

  // Staff specific fields
  bio?: string
  jobTitle?: string
  hourlyRate?: number
  yearsExperience?: string
  skills?: string[]
  location?: string
  availableDays?: string[]
  preferredHours?: string
  noticeRequired?: string

  // Organizer specific fields
  companyName?: string
  eventTypes?: string[]
}

export interface LoginDto {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole
  verified: boolean
  createdAt: Date
}

export interface AuthResponse {
  user: UserResponse
  token: string
}

export interface JwtPayload {
  userId: string
  email: string
  role: UserRole
  iat?: number
  exp?: number
}

export interface RequestWithUser extends Request {
  user?: JwtPayload
}
