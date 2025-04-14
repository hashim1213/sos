import type { StaffMember } from "./types"

// Generate random staff members based on job type
export function generateStaffMembers(jobType: string): StaffMember[] {
  const jobTitles: Record<string, string> = {
    bartender: "Bartender",
    server: "Server",
    security: "Security Guard",
    hostess: "Host/Hostess",
    chef: "Chef",
    cleaner: "Cleaning Staff",
    technician: "AV Technician",
  }

  const jobTitle = jobTitles[jobType] || "Event Staff"

  // Skills based on job type
  const skillsByType: Record<string, string[]> = {
    bartender: ["Cocktail Mixing", "Wine Knowledge", "Speed Bartending", "Flair Bartending", "Inventory Management"],
    server: ["Food Service", "Wine Pairing", "Customer Service", "Tray Carrying", "Order Taking"],
    security: ["Crowd Control", "Conflict Resolution", "First Aid", "Surveillance", "Emergency Response"],
    hostess: ["Guest Relations", "Reservation Management", "Seating Coordination", "VIP Service"],
    chef: ["Food Preparation", "Menu Planning", "Knife Skills", "Plating", "Dietary Accommodations"],
    cleaner: ["Deep Cleaning", "Sanitization", "Equipment Handling", "Quick Turnaround"],
    technician: ["Sound Systems", "Lighting", "Video Equipment", "Troubleshooting", "Live Event Support"],
  }

  // Base skills for all staff types
  const baseSkills = ["Event Experience", "Time Management", "Communication"]

  // Get skills for the specific job type or use generic skills
  const jobSkills = skillsByType[jobType] || ["Event Support", "Customer Service"]

  // Generate 5-8 random staff members
  const count = Math.floor(Math.random() * 4) + 5
  const staffMembers: StaffMember[] = []

  const firstNames = [
    "James",
    "Emma",
    "Michael",
    "Sophia",
    "David",
    "Olivia",
    "Daniel",
    "Ava",
    "Matthew",
    "Isabella",
    "Alex",
    "Mia",
    "John",
    "Charlotte",
    "Robert",
    "Amelia",
    "William",
    "Harper",
    "Joseph",
    "Evelyn",
  ]
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
  ]

  // When creating staff members, use the available avatars
  const avatars = [
    "/images/avatars/alex-johnson.png",
    "/images/avatars/aisha-patel.png",
    "/images/avatars/alicia-r.png",
    "/images/avatars/ambassador-j.png",
    "/images/avatars/anita-k.png",
    "/images/avatars/antoine-l.png",
    "/images/avatars/carlos-rodtriguez.png",
    "/images/avatars/daniel-m.png",
    "/images/avatars/daniel-wilson.png",
  ]

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const name = `${firstName} ${lastName}`

    // Get 2-4 random skills from the job skills plus 1-2 from base skills
    const randomJobSkills = [...jobSkills].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2)
    const randomBaseSkills = [...baseSkills].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1)
    const skills = [...randomJobSkills, ...randomBaseSkills]

    // Generate random experience (1-15 years)
    const yearsExperience = Math.floor(Math.random() * 15) + 1

    // Generate random hourly rate ($15-$50)
    const hourlyRate = Math.floor(Math.random() * 36) + 15

    // Generate random rating (3.5-5.0)
    const rating = Math.random() * 1.5 + 3.5

    // Generate bio
    const bioTemplates = [
      `Experienced ${jobTitle.toLowerCase()} with ${yearsExperience} years in the industry. Specializes in ${skills[0]} and ${skills[1]}.`,
      `Professional ${jobTitle.toLowerCase()} passionate about delivering exceptional service. ${yearsExperience} years of experience in high-end events.`,
      `Reliable ${jobTitle.toLowerCase()} with a track record of excellence. Skilled in ${skills[0]} with ${yearsExperience} years of experience.`,
      `${jobTitle} with expertise in ${skills[0]} and ${skills[1]}. ${yearsExperience} years of experience in various event settings.`,
      `Dedicated ${jobTitle.toLowerCase()} committed to creating memorable experiences. ${yearsExperience} years in the industry.`,
    ]

    const bio = bioTemplates[Math.floor(Math.random() * bioTemplates.length)]

    // Use one of the available avatars
    const avatar = avatars[i % avatars.length]

    staffMembers.push({
      id: `staff-${i + 1}`,
      name,
      avatar,
      jobTitle,
      bio,
      rating,
      hourlyRate,
      yearsExperience,
      skills,
    })
  }

  // Sort by rating (highest first)
  return staffMembers.sort((a, b) => b.rating - a.rating)
}
