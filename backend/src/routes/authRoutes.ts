import express, { type Request, type Response } from "express"
import { body, validationResult } from "express-validator"
import authService from "../services/authService"
import type { LoginDto, RegisterUserDto } from "../types"
import { UserRole } from "@prisma/client"

const router = express.Router()

// Validation middleware
const validateRegistration = [
  //body("email").isEmail().withMessage("Please provide a valid email"),
  //body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  //body("firstName").notEmpty().withMessage("First name is required"),
  //body("lastName").notEmpty().withMessage("Last name is required"),
  body("role").isIn([UserRole.STAFF, UserRole.ORGANIZER]).withMessage("Role must be either STAFF or ORGANIZER"),
]

const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]

// Register route
router.post("/register", validateRegistration, async (req: Request, res: Response) => {
  try {
    console.log('register hit 1')
    console.log('register hit 1' + req.params.toString()) 

    // Check for validation errors
    const errors = validationResult(req)
    console.log('register hit 2')
    //console.log('register hit 2' + errors.array()[0].msg)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    console.log('register hit 3')
    const userData = req.body as RegisterUserDto
    const user = await authService.register(userData)

    return res.status(201).json({
      message: "User registered successfully",
      user,
    })
  } catch (error: any) {
    console.error("Registration error:", error)

    if (error.message === "User with this email already exists") {
      return res.status(400).json({ message: error.message })
    }

    return res.status(500).json({ message: "Server error during registration" })
  }
})

// Login route
router.post("/login", validateLogin, async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    console.log('login hit 1')
    const errors = validationResult(req)
    //console.log('login hit 2' + errors.array()[0].msg)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    console.log('login hit 3')
    const loginData = req.body as LoginDto
    const result = await authService.login(loginData)

    return res.json(result)
  } catch (error: any) {
    console.error("Login error:", error)

    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: error.message })
    }

    return res.status(500).json({ message: "Server error during login" })
  }
})

export default router
