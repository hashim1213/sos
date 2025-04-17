export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "STAFF" | "ORGANIZER" | "ADMIN"
  verified: boolean
  phone?: string
  createdAt: Date
  updatedAt: Date
  staff?: Staff
  organizer?: Organizer
}

export interface Staff {
  id: string
  userId: string
  bio?: string
  jobTitle?: string
  hourlyRate?: number
  yearsExperience?: string
  skills: string[]
  location?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
  avatar?: string
  rating: number
  reviewCount: number
  availableDays: string[]
  preferredHours?: string
  noticeRequired?: string
  backgroundCheck: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Organizer {
  id: string
  userId: string
  companyName?: string
  bio?: string
  location?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
  eventTypes: string[]
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Job {
  id: number
  organizerId: string
  title: string
  description?: string
  jobType: string
  location: string
  date: Date
  startTime: string
  duration: number
  hourlyRate: number
  status: "open" | "filled" | "cancelled" | "completed"
  createdAt: Date
  updatedAt: Date
}

export interface Application {
  id: number
  jobId: number
  staffId: string
  status: "pending" | "accepted" | "rejected" | "withdrawn"
  message?: string
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: number
  jobId: number
  staffId: string
  organizerId: string
  status: "confirmed" | "cancelled" | "completed"
  totalAmount: number
  serviceFee: number
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: number
  bookingId: number
  reviewerId: string
  revieweeId: string
  rating: number
  comment?: string
  createdAt: Date
}

export interface JobWithOrganizer extends Job {
  organizer: {
    companyName?: string
    firstName: string
    lastName: string
    avatar?: string
  }
}

export interface ApplicationWithStaffAndJob extends Application {
  staff: {
    firstName: string
    lastName: string
    avatar?: string
    jobTitle?: string
  }
  job: Job
}

export interface StaffMember {
  id: string
  name: string
  avatar?: string
  jobTitle?: string
  bio?: string
  rating: number
  hourlyRate: number
  yearsExperience: number
  skills: string[]
}

export interface Professional extends StaffMember {
  about?: string
  location?: string
  contact?: {
    email: string
    phone?: string
  }
  availability?: {
    nextAvailable: string
    preferredHours?: string
    noticeRequired?: string
    schedule: Array<{ day: string; hours: string }>
  }
  experience?: Array<{
    position: string
    company: string
    period: string
    description?: string
  }>
  certifications?: Array<{
    name: string
    issuer: string
    year: string
  }>
  reviews?: Array<{
    name: string
    avatar?: string
    rating: number
    date: string
    comment: string
  }>
}

export interface JobDetails {
  address: string
  city: string
  state: string
  zipCode: string
  jobType: string
  date: Date
  startTime: string
  duration: string
  hourlyRate: string
  description?: string
  fullAddress: string
}
