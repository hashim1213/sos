import type { Professional } from "./types"

export const mockProfessionals: Professional[] = [
  {
    id: "prof-1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=200&width=200&text=AJ",
    jobTitle: "Bartender",
    bio: "Experienced bartender specializing in craft cocktails and high-volume service.",
    about:
      "I've been mixing drinks for over 8 years, working in everything from upscale cocktail bars to large music festivals. My specialty is craft cocktails, but I'm equally comfortable handling high-volume service for large events.\n\nI pride myself on efficiency, creativity, and providing excellent customer service. Whether you need classic cocktails or custom creations for your event, I can deliver a memorable experience for your guests.",
    rating: 4.9,
    reviewCount: 47,
    hourlyRate: 45,
    yearsExperience: 8,
    skills: ["Craft Cocktails", "Flair Bartending", "Wine Knowledge", "Inventory Management", "Menu Development"],
    location: "Toronto, ON",
    contact: {
      email: "alex.j@example.com",
      phone: "(416) 555-1234",
    },
    availability: {
      nextAvailable: "Available tomorrow",
      preferredHours: "Evenings & Weekends",
      noticeRequired: "24 hours notice preferred",
      schedule: [
        { day: "Monday", hours: "6PM - 2AM" },
        { day: "Tuesday", hours: "6PM - 2AM" },
        { day: "Wednesday", hours: "" },
        { day: "Thursday", hours: "6PM - 2AM" },
        { day: "Friday", hours: "6PM - 2AM" },
        { day: "Saturday", hours: "6PM - 2AM" },
        { day: "Sunday", hours: "" },
      ],
    },
    experience: [
      {
        position: "Head Bartender",
        company: "The Craft House",
        period: "2019 - Present",
        description: "Lead bartender responsible for menu development, staff training, and inventory management.",
      },
      {
        position: "Bartender",
        company: "Maple Leaf Events",
        period: "2017 - 2019",
        description: "Provided bartending services for corporate events, weddings, and private parties.",
      },
      {
        position: "Bar Back",
        company: "The Distillery",
        period: "2015 - 2017",
        description: "Assisted bartenders during high-volume service and learned the fundamentals of mixology.",
      },
    ],
    certifications: [
      {
        name: "Smart Serve Ontario",
        issuer: "Smart Serve Ontario",
        year: "2015",
      },
      {
        name: "Certified Mixologist",
        issuer: "Canadian Professional Bartenders Association",
        year: "2018",
      },
      {
        name: "Wine & Spirit Education Trust Level 2",
        issuer: "WSET",
        year: "2019",
      },
    ],
    reviews: [
      {
        name: "Sarah M.",
        avatar: "/placeholder.svg?height=40&width=40&text=SM",
        rating: 5,
        date: "June 15, 2023",
        comment:
          "Alex was amazing at our wedding! He created custom cocktails that our guests are still talking about months later. Very professional and personable.",
      },
      {
        name: "David L.",
        avatar: "/placeholder.svg?height=40&width=40&text=DL",
        rating: 5,
        date: "May 3, 2023",
        comment:
          "Hired Alex for a corporate event and he was fantastic. Arrived early to set up, was very organized, and handled our large group with ease.",
      },
      {
        name: "Jennifer K.",
        avatar: "/placeholder.svg?height=40&width=40&text=JK",
        rating: 4,
        date: "April 22, 2023",
        comment:
          "Great service and delicious drinks. Only giving 4 stars because he ran out of one ingredient, but quickly adapted with a great alternative.",
      },
    ],
  },
  {
    id: "prof-2",
    name: "Maya Patel",
    avatar: "/placeholder.svg?height=200&width=200&text=MP",
    jobTitle: "Event Coordinator",
    bio: "Detail-oriented event coordinator with experience managing corporate and social events.",
    about:
      "With 6 years of experience in event coordination, I specialize in ensuring your event runs smoothly from start to finish. I've managed everything from intimate gatherings to large corporate conferences for up to 500 attendees.\n\nMy approach combines meticulous planning with adaptability to handle any unexpected challenges. I work closely with clients to understand their vision and bring it to life while managing all the logistics behind the scenes.",
    rating: 4.8,
    reviewCount: 32,
    hourlyRate: 55,
    yearsExperience: 6,
    skills: ["Event Planning", "Vendor Management", "Budget Administration", "Timeline Creation", "Crisis Management"],
    location: "Vancouver, BC",
    contact: {
      email: "maya.p@example.com",
      phone: "(604) 555-6789",
    },
    availability: {
      nextAvailable: "Available this week",
      preferredHours: "Flexible hours",
      noticeRequired: "48 hours notice preferred",
      schedule: [
        { day: "Monday", hours: "9AM - 5PM" },
        { day: "Tuesday", hours: "9AM - 5PM" },
        { day: "Wednesday", hours: "9AM - 5PM" },
        { day: "Thursday", hours: "9AM - 5PM" },
        { day: "Friday", hours: "9AM - 5PM" },
        { day: "Saturday", hours: "By appointment" },
        { day: "Sunday", hours: "By appointment" },
      ],
    },
    experience: [
      {
        position: "Senior Event Coordinator",
        company: "Pacific Events Co.",
        period: "2020 - Present",
        description: "Lead coordinator for corporate events, galas, and conferences with budgets up to $500,000.",
      },
      {
        position: "Event Planner",
        company: "Celebration Planning",
        period: "2018 - 2020",
        description: "Planned and executed weddings, birthday parties, and anniversary celebrations.",
      },
      {
        position: "Assistant Event Coordinator",
        company: "Vancouver Convention Centre",
        period: "2017 - 2018",
        description: "Assisted with the planning and execution of large-scale conventions and trade shows.",
      },
    ],
    certifications: [
      {
        name: "Certified Meeting Professional (CMP)",
        issuer: "Events Industry Council",
        year: "2019",
      },
      {
        name: "Certificate in Event Management",
        issuer: "British Columbia Institute of Technology",
        year: "2017",
      },
    ],
    reviews: [
      {
        name: "Michael T.",
        avatar: "/placeholder.svg?height=40&width=40&text=MT",
        rating: 5,
        date: "July 10, 2023",
        comment:
          "Maya coordinated our company's annual conference and did an outstanding job. She handled all the details perfectly and was incredibly responsive throughout the planning process.",
      },
      {
        name: "Rebecca H.",
        avatar: "/placeholder.svg?height=40&width=40&text=RH",
        rating: 5,
        date: "May 28, 2023",
        comment:
          "We hired Maya for our wedding and it was the best decision we made. She took care of everything and allowed us to actually enjoy our day without stress.",
      },
      {
        name: "Thomas G.",
        avatar: "/placeholder.svg?height=40&width=40&text=TG",
        rating: 4,
        date: "April 15, 2023",
        comment:
          "Maya did a great job with our product launch event. Very professional and organized. Would recommend her services.",
      },
    ],
  },
  {
    id: "prof-3",
    name: "Carlos Rodriguez",
    avatar: "/placeholder.svg?height=200&width=200&text=CR",
    jobTitle: "Security Specialist",
    bio: "Former military personnel providing professional security services for events of all sizes.",
    about:
      "With a background in military service and 10 years of experience in event security, I provide professional security services that ensure the safety of your guests while maintaining a positive atmosphere.\n\nI specialize in risk assessment, crowd management, and de-escalation techniques. My approach is always professional and discreet, allowing your event to proceed smoothly while I handle any security concerns behind the scenes.",
    rating: 4.9,
    reviewCount: 56,
    hourlyRate: 50,
    yearsExperience: 10,
    skills: ["Crowd Management", "Risk Assessment", "VIP Protection", "De-escalation", "Emergency Response"],
    location: "Montreal, QC",
    contact: {
      email: "carlos.r@example.com",
      phone: "(514) 555-9012",
    },
    availability: {
      nextAvailable: "Available immediately",
      preferredHours: "Any time, 24/7",
      noticeRequired: "4 hours for emergency staffing",
      schedule: [
        { day: "Monday", hours: "24 hours" },
        { day: "Tuesday", hours: "24 hours" },
        { day: "Wednesday", hours: "24 hours" },
        { day: "Thursday", hours: "24 hours" },
        { day: "Friday", hours: "24 hours" },
        { day: "Saturday", hours: "24 hours" },
        { day: "Sunday", hours: "24 hours" },
      ],
    },
    experience: [
      {
        position: "Head of Security",
        company: "Montreal Event Security",
        period: "2018 - Present",
        description:
          "Lead security operations for festivals, concerts, and corporate events with up to 10,000 attendees.",
      },
      {
        position: "Security Specialist",
        company: "Guardian Services",
        period: "2015 - 2018",
        description: "Provided security for high-profile clients and events, including VIP protection.",
      },
      {
        position: "Military Service",
        company: "Canadian Armed Forces",
        period: "2010 - 2015",
        description: "Served in the military with deployments focused on security operations and personnel protection.",
      },
    ],
    certifications: [
      {
        name: "Security Guard License",
        issuer: "Quebec Ministry of Public Security",
        year: "2015",
      },
      {
        name: "First Aid & CPR Certification",
        issuer: "Red Cross",
        year: "2022",
      },
      {
        name: "Advanced Crowd Management",
        issuer: "International Association of Venue Managers",
        year: "2019",
      },
    ],
    reviews: [
      {
        name: "Laura B.",
        avatar: "/placeholder.svg?height=40&width=40&text=LB",
        rating: 5,
        date: "August 5, 2023",
        comment:
          "Carlos provided security for our music festival and was exceptional. He managed a team of 10 security personnel and handled several situations professionally and discreetly.",
      },
      {
        name: "Robert K.",
        avatar: "/placeholder.svg?height=40&width=40&text=RK",
        rating: 5,
        date: "July 22, 2023",
        comment:
          "We hired Carlos for a high-profile corporate event with government officials present. His attention to detail and professionalism were outstanding.",
      },
      {
        name: "Sophia M.",
        avatar: "/placeholder.svg?height=40&width=40&text=SM",
        rating: 4,
        date: "June 18, 2023",
        comment:
          "Carlos did a great job providing security for our wedding. He was unobtrusive but effective when needed to handle a couple of minor issues with uninvited guests.",
      },
    ],
  },
  {
    id: "prof-4",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=200&width=200&text=EW",
    jobTitle: "Server/Waitstaff",
    bio: "Professional server with fine dining experience and excellent customer service skills.",
    about:
      "I've been working in the service industry for 5 years, with experience in both casual and fine dining establishments. I pride myself on providing attentive, friendly service that enhances the guest experience.\n\nMy background includes working at several top-rated restaurants in Calgary, as well as providing service for private events and corporate functions. I'm detail-oriented, efficient, and always maintain a positive, professional demeanor.",
    rating: 4.7,
    reviewCount: 29,
    hourlyRate: 30,
    yearsExperience: 5,
    skills: ["Fine Dining Service", "Wine Service", "Table Setting", "Customer Relations", "POS Systems"],
    location: "Calgary, AB",
    contact: {
      email: "emma.w@example.com",
      phone: "(403) 555-3456",
    },
    availability: {
      nextAvailable: "Available this weekend",
      preferredHours: "Evenings & Weekends",
      noticeRequired: "24 hours notice",
      schedule: [
        { day: "Monday", hours: "" },
        { day: "Tuesday", hours: "" },
        { day: "Wednesday", hours: "4PM - 12AM" },
        { day: "Thursday", hours: "4PM - 12AM" },
        { day: "Friday", hours: "4PM - 12AM" },
        { day: "Saturday", hours: "4PM - 12AM" },
        { day: "Sunday", hours: "4PM - 12AM" },
      ],
    },
    experience: [
      {
        position: "Senior Server",
        company: "The Maple Grill",
        period: "2021 - Present",
        description:
          "Provide fine dining service in an upscale restaurant, handling sections of up to 8 tables and training new staff.",
      },
      {
        position: "Server",
        company: "Calgary Events Catering",
        period: "2019 - 2021",
        description: "Served at weddings, corporate events, and private parties with up to 200 guests.",
      },
      {
        position: "Server Assistant",
        company: "The Grand Hotel",
        period: "2018 - 2019",
        description:
          "Assisted servers in a luxury hotel restaurant, learning proper service techniques and guest relations.",
      },
    ],
    certifications: [
      {
        name: "ProServe Certification",
        issuer: "Alberta Gaming and Liquor Commission",
        year: "2018",
      },
      {
        name: "Food Safety Certification",
        issuer: "Alberta Health Services",
        year: "2018",
      },
    ],
    reviews: [
      {
        name: "James P.",
        avatar: "/placeholder.svg?height=40&width=40&text=JP",
        rating: 5,
        date: "July 30, 2023",
        comment:
          "Emma served at our anniversary dinner and was absolutely wonderful. She was attentive without being intrusive and made our evening special.",
      },
      {
        name: "Natalie C.",
        avatar: "/placeholder.svg?height=40&width=40&text=NC",
        rating: 4,
        date: "June 12, 2023",
        comment: "Emma did a great job at our corporate luncheon. Very professional and efficient with a large group.",
      },
      {
        name: "Daniel M.",
        avatar: "/placeholder.svg?height=40&width=40&text=DM",
        rating: 5,
        date: "May 8, 2023",
        comment:
          "We hired Emma for a private dinner party and she provided excellent service. She was knowledgeable about the wine pairings and very personable.",
      },
    ],
  },
  {
    id: "prof-5",
    name: "Jackson Lee",
    avatar: "/placeholder.svg?height=200&width=200&text=JL",
    jobTitle: "AV Technician",
    bio: "Experienced audio-visual technician specializing in event production and technical support.",
    about:
      "I've been working in the audio-visual field for 7 years, providing technical support for conferences, concerts, weddings, and corporate events. I specialize in sound systems, lighting, video projection, and livestreaming setups.\n\nMy goal is to ensure your event's technical aspects run flawlessly, allowing you to focus on your guests and content. I'm comfortable working with various equipment brands and can adapt to different venue requirements.",
    rating: 4.8,
    reviewCount: 38,
    hourlyRate: 60,
    yearsExperience: 7,
    skills: ["Sound Engineering", "Lighting Design", "Video Projection", "Livestreaming", "Troubleshooting"],
    location: "Ottawa, ON",
    contact: {
      email: "jackson.l@example.com",
      phone: "(613) 555-7890",
    },
    availability: {
      nextAvailable: "Available next week",
      preferredHours: "Flexible hours",
      noticeRequired: "72 hours notice preferred",
      schedule: [
        { day: "Monday", hours: "9AM - 9PM" },
        { day: "Tuesday", hours: "9AM - 9PM" },
        { day: "Wednesday", hours: "9AM - 9PM" },
        { day: "Thursday", hours: "9AM - 9PM" },
        { day: "Friday", hours: "9AM - 9PM" },
        { day: "Saturday", hours: "9AM - 9PM" },
        { day: "Sunday", hours: "" },
      ],
    },
    experience: [
      {
        position: "Lead AV Technician",
        company: "Capital Event Productions",
        period: "2020 - Present",
        description:
          "Manage audio-visual setups for conferences, galas, and corporate events with up to 1,000 attendees.",
      },
      {
        position: "Sound Engineer",
        company: "Ottawa Music Festival",
        period: "2018 - 2020",
        description: "Handled sound engineering for multiple stages at annual music festivals.",
      },
      {
        position: "AV Assistant",
        company: "Conference Technologies Inc.",
        period: "2016 - 2018",
        description:
          "Assisted with setup and operation of audio-visual equipment for corporate events and conferences.",
      },
    ],
    certifications: [
      {
        name: "Certified Technology Specialist (CTS)",
        issuer: "AVIXA",
        year: "2019",
      },
      {
        name: "Dante Level 2 Certification",
        issuer: "Audinate",
        year: "2020",
      },
      {
        name: "Electrical Safety Certification",
        issuer: "Electrical Safety Authority",
        year: "2018",
      },
    ],
    reviews: [
      {
        name: "Victoria S.",
        avatar: "/placeholder.svg?height=40&width=40&text=VS",
        rating: 5,
        date: "August 15, 2023",
        comment:
          "Jackson handled the AV for our conference and did an amazing job. The sound was perfect, presentations ran smoothly, and he even helped us set up a last-minute livestream.",
      },
      {
        name: "Mark J.",
        avatar: "/placeholder.svg?height=40&width=40&text=MJ",
        rating: 5,
        date: "July 3, 2023",
        comment:
          "We hired Jackson for our wedding reception. He set up the sound system, lighting, and video projection for our slideshow. Everything was perfect!",
      },
      {
        name: "Alicia R.",
        avatar: "/placeholder.svg?height=40&width=40&text=AR",
        rating: 4,
        date: "June 20, 2023",
        comment:
          "Jackson provided AV support for our corporate event. He was professional, knowledgeable, and quick to resolve a minor issue with our microphones.",
      },
    ],
  },
]
