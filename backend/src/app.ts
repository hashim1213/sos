import express, { type Request, type Response, type NextFunction } from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import { authenticate, authorize } from "./middleware/authMiddleware"
import { UserRole } from "@prisma/client"
import type { RequestWithUser } from "./types"

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)

// Protected route example
app.get("/api/staff/profile", authenticate, authorize([UserRole.STAFF]), (req: Request, res: Response) => {
  const userReq = req as RequestWithUser
  res.json({ message: "Staff profile accessed", userId: userReq.user?.userId })
})

app.get("/api/organizer/profile", authenticate, authorize([UserRole.ORGANIZER]), (req: Request, res: Response) => {
  const userReq = req as RequestWithUser
  res.json({ message: "Organizer profile accessed", userId: userReq.user?.userId })
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

export default app
