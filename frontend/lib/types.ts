export interface JobDetails {
  address: string
  city: string
  state: string
  zipCode: string
  fullAddress: string
  jobType: string
  date: Date
  startTime: string
  duration: string
  hourlyRate: string
  description: string
}

export interface StaffMember {
  id: string
  name: string
  avatar: string
  jobTitle: string
  bio: string
  rating: number
  hourlyRate: number
  yearsExperience: number
  skills: string[]
}

export interface Professional extends StaffMember {
  about: string
  reviewCount: number
  location: string
  contact: {
    email: string
    phone: string
  }
  availability: {
    nextAvailable: string
    preferredHours: string
    noticeRequired: string
    schedule: {
      day: string
      hours: string
    }[]
  }
  experience: {
    position: string
    company: string
    period: string
    description: string
  }[]
  certifications: {
    name: string
    issuer: string
    year: string
  }[]
  reviews: {
    name: string
    avatar: string
    rating: number
    date: string
    comment: string
  }[]
}
