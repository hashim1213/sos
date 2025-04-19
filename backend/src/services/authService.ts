import { PrismaClient, UserRole } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import type { RegisterUserDto, LoginDto, AuthResponse, JwtPayload, UserResponse } from "../types"

const prisma = new PrismaClient()

// JWT secret should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

class AuthService {
  /**
   * Register a new user
   */
  async register(userData: RegisterUserDto): Promise<UserResponse> {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      // Additional fields based on role
      ...additionalData
    } = userData
  
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
  
    if (existingUser) {
      throw new Error("User with this email already exists")
    }
  
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)
  
    // Create user with transaction to ensure both user and role-specific data are created
    return await prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          phone,
          role,
        },
      })
  
      // Create role-specific profile
      if (role === UserRole.STAFF) {
        const {
          bio,
          jobTitle,
          hourlyRate,
          yearsExperience,
          skills,
          address,
          city,
          province,
          postalCode,
          availableDays,
          preferredHours,
          noticeRequired,
        } = additionalData as any
  
        // Create location if address is provided
        console.log(address)

        let locationId = null
        if (address) {
          const location = await prisma.location.create({
            data: {
              address,
              city,
              province,
              postalCode,
            },
          })
          locationId = location.id
        }
  
        await prisma.staff.create({
          data: {
            userId: user.id,
            bio,
            jobTitle,
            hourlyRate: hourlyRate ? Number(hourlyRate) : undefined,
            yearsExperience,
            skills: skills || [],
            locationId,
            availableDays: availableDays || [],
            preferredHours,
            noticeRequired,
          },
        })
      } else if (role === UserRole.ORGANIZER) {
        const { 
          companyName, 
          bio, 
          eventTypes,
          address,
          city,
          province,
          postalCode
        } = additionalData as any
  
        // Create location if address is provided
        let locationId = null
        if (address) {
          const location = await prisma.location.create({
            data: {
              address,
              city,
              province,
              postalCode,
            },
          })
          locationId = location.id
        }
  
        await prisma.organizer.create({
          data: {
            userId: user.id,
            companyName,
            bio,
            locationId,
            eventTypes: eventTypes || [],
          },
        })
      }
  
      // Return user without password hash
      const { passwordHash: _, ...userData } = user
      return userData as UserResponse
    })
  }

  /**
   * Login a user
   */
  async login(loginData: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginData

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error("Invalid credentials")
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      throw new Error("Invalid credentials")
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      } as JwtPayload,
      JWT_SECRET,
      { expiresIn: "24h" },
    )

    // Return user data and token
    const { passwordHash, ...userData } = user
    return {
      user: userData as UserResponse,
      token,
    }
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch (error) {
      throw new Error("Invalid token")
    }
  }
}

export default new AuthService()
