"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { X, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Function to generate dynamic profiles based on search query
function generateDynamicProfiles(searchType: string, searchQuery: string) {
  const query = searchQuery.toLowerCase().trim()

  // Default colors for profile avatars
  const colors = [
    { bg: "bg-red-100", text: "text-red-700" },
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-yellow-100", text: "text-yellow-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
    { bg: "bg-indigo-100", text: "text-indigo-700" },
    { bg: "bg-orange-100", text: "text-orange-700" },
  ]

  // Generate profiles based on search type and query
  if (searchType === "professionals") {
    // Professional roles based on common search terms
    const roles: Record<string, string[]> = {
      bartender: ["Alex B.", "Jamie T.", "Morgan L.", "Taylor S.", "Jordan P."],
      server: ["Casey W.", "Riley S.", "Quinn J.", "Avery M.", "Dakota R."],
      security: ["Sam G.", "Cameron S.", "Blake D.", "Jordan K.", "Reese M."],
      chef: ["Charlie C.", "Jamie O.", "Alex K.", "Morgan F.", "Taylor C."],
      host: ["Riley H.", "Avery W.", "Jordan L.", "Casey M.", "Quinn P."],
      technician: ["Morgan T.", "Blake A.", "Taylor V.", "Sam T.", "Cameron E."],
      coordinator: ["Avery C.", "Jamie P.", "Riley E.", "Quinn C.", "Dakota O."],
      dj: ["Jordan D.", "Blake M.", "Casey J.", "Taylor D.", "Sam M."],
      "": ["Alex S.", "Jamie K.", "Morgan P.", "Taylor B.", "Riley J."], // Default names
    }

    // Find the most relevant role based on the query
    let matchedRole = ""
    Object.keys(roles).forEach((role) => {
      if (query.includes(role)) {
        if (role.length > matchedRole.length) {
          // Use the longest matching role
          matchedRole = role
        }
      }
    })

    // If no specific role matched, use the first word of the query if it exists
    if (!matchedRole && query) {
      matchedRole = query.split(" ")[0]
    }

    // Get names for the matched role, or use default names
    const names = roles[matchedRole] || roles[""]

    // Create profiles with the names and appropriate role
    return names.map((name, index) => {
      const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
      const color = colors[index % colors.length]
      const displayRole = matchedRole
        ? matchedRole.charAt(0).toUpperCase() + matchedRole.slice(1)
        : "Event Professional"

      return {
        id: index + 1,
        name,
        initials,
        role: displayRole,
        bgColor: color.bg,
        textColor: color.text,
      }
    })
  } else {
    // Organizer types based on common search terms
    const types: Record<string, string[]> = {
      wedding: ["Elegant Events", "Dream Weddings", "Forever Moments", "White Lace Events", "Bridal Bliss"],
      corporate: [
        "Business Solutions",
        "Corporate Connect",
        "Executive Events",
        "Summit Planners",
        "Professional Events",
      ],
      festival: ["Festival Creators", "Celebration Central", "Event Horizon", "Festive Productions", "Carnival Crew"],
      conference: ["Conference Masters", "Meeting Experts", "Summit Solutions", "Podium Events", "Speaker Circuit"],
      "": ["Event Masters", "Celebration Experts", "Occasion Planners", "Gathering Gurus", "Moment Makers"], // Default names
    }

    // Find the most relevant type based on the query
    let matchedType = ""
    Object.keys(types).forEach((type) => {
      if (query.includes(type)) {
        if (type.length > matchedType.length) {
          // Use the longest matching type
          matchedType = type
        }
      }
    })

    // If no specific type matched, use the first word of the query if it exists
    if (!matchedType && query) {
      matchedType = query.split(" ")[0]
    }

    // Get names for the matched type, or use default names
    const names = types[matchedType] || types[""]

    // Create profiles with the names and appropriate type
    return names.map((name, index) => {
      const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
      const color = colors[index % colors.length]
      const displayType = matchedType
        ? matchedType.charAt(0).toUpperCase() + matchedType.slice(1) + " Planner"
        : "Event Organizer"

      return {
        id: index + 1,
        name,
        initials,
        role: displayType,
        bgColor: color.bg,
        textColor: color.text,
      }
    })
  }
}

interface SearchAnimationModalProps {
  isOpen: boolean
  onClose: () => void
  searchType: "professionals" | "organizers"
  searchQuery: string
}

export function SearchAnimationModal({ isOpen, onClose, searchType, searchQuery }: SearchAnimationModalProps) {
  const router = useRouter()
  const [foundProfiles, setFoundProfiles] = useState<
    Array<{
      id: number
      name: string
      initials: string
      role: string
      bgColor: string
      textColor: string
    }>
  >([])
  const [isComplete, setIsComplete] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  // Generate dynamic profiles based on search query
  const dynamicProfiles = useMemo(() => generateDynamicProfiles(searchType, searchQuery), [searchType, searchQuery])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFoundProfiles([])
      setIsComplete(false)
      setScanProgress(0)
    }
  }, [isOpen])

  // Handle animation and redirect
  useEffect(() => {
    if (!isOpen) return

    // Progress animation
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Simulate finding profiles over time
    const profileTimers = dynamicProfiles.map((profile, index) => {
      return setTimeout(
        () => {
          setFoundProfiles((prev) => [...prev, profile])
        },
        1200 + index * 400,
      ) // Stagger the appearance
    })

    // Set complete flag after all profiles are found
    const completeTimer = setTimeout(
      () => {
        setIsComplete(true)
      },
      1200 + dynamicProfiles.length * 400 + 500,
    )

    // Redirect after animation completes
    const redirectTimer = setTimeout(
      () => {
        router.push(`/${searchType}?q=${encodeURIComponent(searchQuery)}`)
        onClose()
      },
      1200 + dynamicProfiles.length * 400 + 1800,
    )

    return () => {
      clearInterval(progressInterval)
      profileTimers.forEach(clearTimeout)
      clearTimeout(completeTimer)
      clearTimeout(redirectTimer)
    }
  }, [isOpen, router, searchType, searchQuery, onClose, dynamicProfiles])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
          >
            {/* Header with cancel button */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Searching for {searchType === "professionals" ? "professionals" : "organizers"}...
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Query */}
            <p className="mb-6 text-center text-gray-500">Finding matches for "{searchQuery}"</p>

            {/* Improved Scanner Animation */}
            <div className="relative mx-auto mb-8 h-52 w-52 overflow-hidden rounded-full border border-gray-100">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>

              {/* Scanning progress indicator */}
              <motion.div className="absolute bottom-0 left-0 h-1 bg-primary" style={{ width: `${scanProgress}%` }} />

              {/* Radar Circles */}
              <motion.div
                className="absolute inset-0 rounded-full border border-gray-200"
                animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-gray-300"
                animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: 1 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-gray-400"
                animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay: 2 }}
              />


              {/* Glowing center */}
              <motion.div
                className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Search Icon */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Search className="h-8 w-8 text-white" />
              </motion.div>

              {/* Random Dots */}
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="absolute h-2 w-2 rounded-full bg-primary"
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: `${Math.random() * 140 - 70}%`,
                    y: `${Math.random() * 140 - 70}%`,
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>

            {/* Found Profiles */}
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatePresence>
                {foundProfiles.map((profile) => (
                  <motion.div
                    key={profile.id}
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: Math.random() * 0.2,
                    }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      className={`flex h-16 w-16 items-center justify-center rounded-full ${profile.bgColor} text-lg font-bold ${profile.textColor}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {profile.initials}
                    </motion.div>
                    <span className="mt-1 text-sm font-medium text-gray-800">{profile.name}</span>
                    <span className="text-xs text-gray-500">{profile.role}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Completion Message */}
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mt-6 text-center"
                >
                  <p className="font-medium text-green-600">
                    Found matches! Redirecting to results...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
