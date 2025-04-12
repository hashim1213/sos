export interface Organizer {
  id: string
  name: string
  avatar: string
  companyName: string
  bio: string
  about: string
  rating: number
  reviewCount: number
  eventTypes: string[]
  location: string
  contact: {
    email: string
    phone: string
    website?: string
  }
  experience: {
    position: string
    company: string
    period: string
    description: string
  }[]
  pastEvents: {
    name: string
    date: string
    location: string
    description: string
    images: string[]
  }[]
  reviews: {
    name: string
    avatar: string
    rating: number
    date: string
    comment: string
  }[]
}

export const mockOrganizers: Organizer[] = [
  {
    id: "org-1",
    name: "Emily Thompson",
    avatar: "/placeholder.svg?height=200&width=200&text=ET",
    companyName: "Elegant Affairs",
    bio: "Luxury wedding and event planner with over 10 years of experience creating memorable celebrations.",
    about:
      "With a passion for perfection and an eye for exquisite details, I've been planning and executing luxury weddings and high-end events for over a decade. My approach combines creativity with meticulous organization to create seamless, unforgettable experiences.\n\nMy team and I handle everything from venue selection and vendor coordination to day-of execution, allowing our clients to fully enjoy their special day without worry. We pride ourselves on personalized service and bringing unique visions to life.",
    rating: 4.9,
    reviewCount: 68,
    eventTypes: ["Weddings", "Engagement Parties", "Anniversary Celebrations", "Luxury Social Events"],
    location: "Toronto, ON",
    contact: {
      email: "emily@elegantaffairs.ca",
      phone: "(416) 555-7890",
      website: "www.elegantaffairs.ca",
    },
    experience: [
      {
        position: "Founder & Principal Planner",
        company: "Elegant Affairs",
        period: "2013 - Present",
        description:
          "Founded boutique event planning company specializing in luxury weddings and social events across Canada.",
      },
      {
        position: "Senior Event Coordinator",
        company: "The Grand Hotel",
        period: "2009 - 2013",
        description: "Managed high-profile weddings and corporate events at Toronto's premier luxury hotel.",
      },
      {
        position: "Event Assistant",
        company: "Toronto Event Design",
        period: "2007 - 2009",
        description: "Assisted with planning and coordination of various social and corporate events.",
      },
    ],
    pastEvents: [
      {
        name: "Williams-Johnson Wedding",
        date: "June 15, 2023",
        location: "Casa Loma, Toronto",
        description:
          "Elegant castle wedding with 200 guests featuring a string quartet, custom floral installations, and a five-course dinner.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Wedding1",
          "/placeholder.svg?height=300&width=400&text=Wedding2",
        ],
      },
      {
        name: "Smith 50th Anniversary",
        date: "March 22, 2023",
        location: "The Royal Conservatory, Toronto",
        description:
          "Golden anniversary celebration with 150 guests, featuring live jazz, gourmet dining, and custom decor.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Anniversary1",
          "/placeholder.svg?height=300&width=400&text=Anniversary2",
        ],
      },
      {
        name: "Chen-Williams Wedding",
        date: "September 8, 2022",
        location: "Estates of Sunnybrook, Toronto",
        description:
          "Garden wedding with Asian fusion elements, featuring custom lantern installations and a tea ceremony.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Wedding3",
          "/placeholder.svg?height=300&width=400&text=Wedding4",
        ],
      },
    ],
    reviews: [
      {
        name: "Rebecca W.",
        avatar: "/placeholder.svg?height=40&width=40&text=RW",
        rating: 5,
        date: "July 10, 2023",
        comment:
          "Emily and her team made our wedding absolutely perfect! From the initial planning stages to the day-of coordination, everything was handled with such professionalism and care. She thought of details we never would have considered.",
      },
      {
        name: "Michael S.",
        avatar: "/placeholder.svg?height=40&width=40&text=MS",
        rating: 5,
        date: "April 3, 2023",
        comment:
          "We hired Elegant Affairs for our 50th anniversary celebration and couldn't be happier. Emily created an elegant, memorable event that perfectly captured our journey together. Highly recommend!",
      },
      {
        name: "Jennifer L.",
        avatar: "/placeholder.svg?height=40&width=40&text=JL",
        rating: 4,
        date: "October 15, 2022",
        comment:
          "Emily is incredibly talented and organized. Our wedding was beautiful and ran smoothly. The only reason for 4 stars instead of 5 was a small miscommunication with one vendor, but Emily resolved it quickly.",
      },
    ],
  },
  {
    id: "org-2",
    name: "Marcus Chen",
    avatar: "/placeholder.svg?height=200&width=200&text=MC",
    companyName: "Elevate Events",
    bio: "Corporate event specialist with expertise in conferences, product launches, and company retreats.",
    about:
      "I specialize in creating impactful corporate events that align with business objectives while providing memorable experiences for attendees. With a background in marketing and event management, I understand both the strategic and logistical aspects of successful corporate gatherings.\n\nMy team at Elevate Events handles everything from venue sourcing and speaker coordination to technical production and post-event analytics. We pride ourselves on precision, creativity, and delivering measurable results for our clients.",
    rating: 4.8,
    reviewCount: 42,
    eventTypes: ["Corporate Conferences", "Product Launches", "Trade Shows", "Company Retreats", "Award Ceremonies"],
    location: "Vancouver, BC",
    contact: {
      email: "marcus@elevateevents.ca",
      phone: "(604) 555-1234",
      website: "www.elevateevents.ca",
    },
    experience: [
      {
        position: "Founder & CEO",
        company: "Elevate Events",
        period: "2015 - Present",
        description:
          "Founded corporate event management company serving tech, finance, and healthcare sectors across North America.",
      },
      {
        position: "Director of Events",
        company: "TechNorth Conference",
        period: "2012 - 2015",
        description: "Managed annual technology conference with 5,000+ attendees, 200+ speakers, and 100+ exhibitors.",
      },
      {
        position: "Corporate Events Manager",
        company: "Pacific Marketing Group",
        period: "2009 - 2012",
        description: "Planned and executed client events, product launches, and internal corporate functions.",
      },
    ],
    pastEvents: [
      {
        name: "TechVision 2023 Conference",
        date: "May 10-12, 2023",
        location: "Vancouver Convention Centre",
        description:
          "Three-day technology conference with 3,000 attendees, featuring keynote speakers, breakout sessions, and exhibition hall with 75 vendors.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Conference1",
          "/placeholder.svg?height=300&width=400&text=Conference2",
        ],
      },
      {
        name: "NovaTech Product Launch",
        date: "February 8, 2023",
        location: "Science World, Vancouver",
        description:
          "High-profile product launch event with media presence, live demonstrations, and interactive experiences for 300 guests.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Launch1",
          "/placeholder.svg?height=300&width=400&text=Launch2",
        ],
      },
      {
        name: "Global Finance Summit",
        date: "November 15-16, 2022",
        location: "Fairmont Pacific Rim, Vancouver",
        description:
          "Executive-level financial conference with international speakers, networking events, and gala dinner.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Summit1",
          "/placeholder.svg?height=300&width=400&text=Summit2",
        ],
      },
    ],
    reviews: [
      {
        name: "Sarah J.",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
        rating: 5,
        date: "June 2, 2023",
        comment:
          "Marcus and his team at Elevate Events managed our annual conference flawlessly. Their attention to detail, technical expertise, and ability to solve problems on the fly made all the difference. Our attendees rated it as our best event yet!",
      },
      {
        name: "David K.",
        avatar: "/placeholder.svg?height=40&width=40&text=DK",
        rating: 5,
        date: "March 15, 2023",
        comment:
          "We hired Elevate for our product launch and were blown away by the results. Marcus understood our brand and created an event that generated significant media coverage and customer interest. Worth every penny.",
      },
      {
        name: "Lisa M.",
        avatar: "/placeholder.svg?height=40&width=40&text=LM",
        rating: 4,
        date: "December 10, 2022",
        comment:
          "Marcus is incredibly professional and organized. Our company retreat was well-executed and met all our objectives. The only hiccup was with the AV setup, but his team resolved it quickly.",
      },
    ],
  },
  {
    id: "org-3",
    name: "Sophia Rodriguez",
    avatar: "/placeholder.svg?height=200&width=200&text=SR",
    companyName: "Festival Collective",
    bio: "Festival and large-scale event producer specializing in music, arts, and cultural celebrations.",
    about:
      "I'm passionate about creating immersive, community-building experiences through festivals and large-scale events. With over 12 years in the industry, I've developed expertise in all aspects of festival production, from artist booking and site management to sponsorship activation and audience engagement.\n\nMy team at Festival Collective brings together specialists in production, programming, marketing, and operations to deliver safe, sustainable, and unforgettable events that celebrate music, arts, and culture.",
    rating: 4.7,
    reviewCount: 39,
    eventTypes: [
      "Music Festivals",
      "Cultural Celebrations",
      "Arts Festivals",
      "Food & Wine Festivals",
      "Community Events",
    ],
    location: "Montreal, QC",
    contact: {
      email: "sophia@festivalcollective.ca",
      phone: "(514) 555-9876",
      website: "www.festivalcollective.ca",
    },
    experience: [
      {
        position: "Founder & Creative Director",
        company: "Festival Collective",
        period: "2014 - Present",
        description:
          "Founded event production company specializing in festivals and large-scale cultural events across Canada.",
      },
      {
        position: "Production Director",
        company: "Montreal Summer Music Festival",
        period: "2010 - 2014",
        description:
          "Managed all production aspects of annual music festival with 50,000+ attendees and multiple stages.",
      },
      {
        position: "Event Coordinator",
        company: "Arts Council of Montreal",
        period: "2007 - 2010",
        description: "Coordinated various cultural events, exhibitions, and community arts programming.",
      },
    ],
    pastEvents: [
      {
        name: "Northern Lights Music Festival",
        date: "July 21-23, 2023",
        location: "Parc Jean-Drapeau, Montreal",
        description:
          "Three-day music festival featuring 40+ artists across 4 stages, with art installations, food vendors, and camping for 15,000 attendees.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Festival1",
          "/placeholder.svg?height=300&width=400&text=Festival2",
        ],
      },
      {
        name: "Montreal Cultural Fusion",
        date: "September 9-10, 2022",
        location: "Old Port, Montreal",
        description:
          "Weekend celebration of Montreal's diverse cultures featuring performances, workshops, culinary experiences, and artisan market.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Cultural1",
          "/placeholder.svg?height=300&width=400&text=Cultural2",
        ],
      },
      {
        name: "Winter Light Festival",
        date: "February 3-12, 2022",
        location: "Various locations, Montreal",
        description:
          "10-day winter festival featuring light installations, projection mapping, interactive art, and performances throughout the city.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Winter1",
          "/placeholder.svg?height=300&width=400&text=Winter2",
        ],
      },
    ],
    reviews: [
      {
        name: "Antoine L.",
        avatar: "/placeholder.svg?height=40&width=40&text=AL",
        rating: 5,
        date: "August 5, 2023",
        comment:
          "Sophia and her team created an incredible festival experience! The attention to detail, from artist curation to site design, was exceptional. Despite challenging weather, they kept everything running smoothly and safely.",
      },
      {
        name: "Michelle T.",
        avatar: "/placeholder.svg?height=40&width=40&text=MT",
        rating: 4,
        date: "October 12, 2022",
        comment:
          "The Cultural Fusion event was beautiful and well-organized. Great variety of performances and activities. Only suggestion would be more food vendors to reduce wait times, but overall a wonderful experience.",
      },
      {
        name: "Jean-Paul B.",
        avatar: "/placeholder.svg?height=40&width=40&text=JPB",
        rating: 5,
        date: "February 20, 2022",
        comment:
          "The Winter Light Festival transformed our city! Sophia's vision and execution were flawless. The festival attracted visitors from across the region and created magical experiences throughout Montreal.",
      },
    ],
  },
  {
    id: "org-4",
    name: "Daniel Wilson",
    avatar: "/placeholder.svg?height=200&width=200&text=DW",
    companyName: "Precision Events",
    bio: "Specialized in high-security events, political functions, and VIP gatherings requiring discretion and precision.",
    about:
      "I provide comprehensive event management for high-security functions, political events, and VIP gatherings where discretion, security, and flawless execution are paramount. With a background in security operations and event logistics, I bring a unique skill set to sensitive and high-profile events.\n\nMy team at Precision Events includes security specialists, logistics experts, and event professionals who understand the unique requirements of diplomatic functions, political campaigns, celebrity appearances, and corporate events requiring enhanced security measures.",
    rating: 4.9,
    reviewCount: 31,
    eventTypes: [
      "Political Functions",
      "Diplomatic Events",
      "Celebrity Appearances",
      "High-Security Corporate Events",
      "VIP Protection",
    ],
    location: "Ottawa, ON",
    contact: {
      email: "daniel@precisionevents.ca",
      phone: "(613) 555-4321",
      website: "www.precisionevents.ca",
    },
    experience: [
      {
        position: "Founder & Director",
        company: "Precision Events",
        period: "2016 - Present",
        description:
          "Founded specialized event management company for high-security and high-profile events across North America.",
      },
      {
        position: "Security Operations Manager",
        company: "Government of Canada",
        period: "2011 - 2016",
        description:
          "Managed security operations for official government functions, diplomatic visits, and ministerial events.",
      },
      {
        position: "Event Security Consultant",
        company: "Global Protection Services",
        period: "2008 - 2011",
        description: "Provided security consulting and planning for corporate events and executive protection.",
      },
    ],
    pastEvents: [
      {
        name: "International Diplomatic Summit",
        date: "April 5-7, 2023",
        location: "National Arts Centre, Ottawa",
        description:
          "Three-day diplomatic conference with representatives from 25 countries, featuring enhanced security protocols, simultaneous translation, and formal receptions.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Diplomatic1",
          "/placeholder.svg?height=300&width=400&text=Diplomatic2",
        ],
      },
      {
        name: "Celebrity Charity Gala",
        date: "November 12, 2022",
        location: "Chateau Laurier, Ottawa",
        description:
          "High-profile fundraising event with celebrity guests, requiring discrete security, media management, and VIP handling.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Charity1",
          "/placeholder.svg?height=300&width=400&text=Charity2",
        ],
      },
      {
        name: "Corporate Executive Retreat",
        date: "June 18-20, 2022",
        location: "Montebello, Quebec",
        description:
          "Secure retreat for C-suite executives from Fortune 500 company, featuring confidential strategy sessions and outdoor activities.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Corporate1",
          "/placeholder.svg?height=300&width=400&text=Corporate2",
        ],
      },
    ],
    reviews: [
      {
        name: "Ambassador J.",
        avatar: "/placeholder.svg?height=40&width=40&text=AJ",
        rating: 5,
        date: "May 2, 2023",
        comment:
          "Daniel and his team handled our diplomatic event with the utmost professionalism and attention to security details. The complex protocol requirements were managed perfectly, and all our international guests felt safe and well-cared for.",
      },
      {
        name: "Sarah T.",
        avatar: "/placeholder.svg?height=40&width=40&text=ST",
        rating: 5,
        date: "December 5, 2022",
        comment:
          "We engaged Precision Events for a high-profile charity gala with celebrity attendees. Daniel's team managed security, media, and guest experience seamlessly. Their discrete approach allowed our VIPs to enjoy the event without disruption.",
      },
      {
        name: "Michael R.",
        avatar: "/placeholder.svg?height=40&width=40&text=MR",
        rating: 4,
        date: "July 10, 2022",
        comment:
          "Our executive retreat required both security and a relaxed atmosphere - a difficult balance that Daniel achieved perfectly. The only minor issue was with one activity that ran overtime, but overall an excellent experience.",
      },
    ],
  },
  {
    id: "org-5",
    name: "Aisha Patel",
    avatar: "/placeholder.svg?height=200&width=200&text=AP",
    companyName: "Vibrant Celebrations",
    bio: "Specializing in South Asian weddings and cultural celebrations with modern flair and traditional respect.",
    about:
      "I create beautiful, meaningful celebrations that honor cultural traditions while incorporating contemporary elements. Specializing in South Asian weddings and multicultural events, I bring deep understanding of cultural protocols alongside innovative design and seamless planning.\n\nMy team at Vibrant Celebrations includes specialists in cultural ceremonies, decor, catering, and entertainment who work together to create authentic, respectful, and joyful celebrations that reflect each client's unique heritage and personal style.",
    rating: 4.8,
    reviewCount: 45,
    eventTypes: [
      "South Asian Weddings",
      "Multicultural Celebrations",
      "Religious Ceremonies",
      "Sangeet & Mehndi",
      "Cultural Festivals",
    ],
    location: "Mississauga, ON",
    contact: {
      email: "aisha@vibrantcelebrations.ca",
      phone: "(905) 555-8765",
      website: "www.vibrantcelebrations.ca",
    },
    experience: [
      {
        position: "Founder & Lead Planner",
        company: "Vibrant Celebrations",
        period: "2012 - Present",
        description:
          "Founded cultural event planning company specializing in South Asian weddings and multicultural celebrations.",
      },
      {
        position: "Cultural Events Coordinator",
        company: "Grand Celebrations Banquet Hall",
        period: "2009 - 2012",
        description:
          "Coordinated cultural weddings and events at premier South Asian event venue in Greater Toronto Area.",
      },
      {
        position: "Assistant Planner",
        company: "Toronto Wedding Collective",
        period: "2007 - 2009",
        description:
          "Assisted with planning and coordination of diverse wedding celebrations across cultural traditions.",
      },
    ],
    pastEvents: [
      {
        name: "Sharma-Patel Wedding",
        date: "August 12-14, 2023",
        location: "Pearson Convention Center, Brampton",
        description:
          "Three-day South Asian wedding celebration including Sangeet, traditional ceremony, and reception for 400 guests with custom mandap, cultural performances, and fusion catering.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Wedding1",
          "/placeholder.svg?height=300&width=400&text=Wedding2",
        ],
      },
      {
        name: "Diwali Gala Fundraiser",
        date: "October 21, 2022",
        location: "The International Centre, Mississauga",
        description:
          "Cultural celebration and charity fundraiser for 500 guests featuring traditional performances, contemporary Indian cuisine, and silent auction.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Diwali1",
          "/placeholder.svg?height=300&width=400&text=Diwali2",
        ],
      },
      {
        name: "Singh-Williams Wedding",
        date: "June 25-26, 2022",
        location: "Graydon Hall Manor, Toronto",
        description:
          "Fusion wedding celebration blending Sikh and Christian traditions with customized ceremonies, cross-cultural entertainment, and fusion menu.",
        images: [
          "/placeholder.svg?height=300&width=400&text=Fusion1",
          "/placeholder.svg?height=300&width=400&text=Fusion2",
        ],
      },
    ],
    reviews: [
      {
        name: "Priya & Raj S.",
        avatar: "/placeholder.svg?height=40&width=40&text=PRS",
        rating: 5,
        date: "September 2, 2023",
        comment:
          "Aisha made our wedding dreams come true! She understood all our cultural requirements while adding modern touches that reflected our personalities. Every detail was perfect, from the mandap design to the menu that satisfied both our traditional relatives and younger friends.",
      },
      {
        name: "Anita K.",
        avatar: "/placeholder.svg?height=40&width=40&text=AK",
        rating: 5,
        date: "November 15, 2022",
        comment:
          "The Diwali Gala that Aisha organized for our charity was spectacular. She created an authentic cultural experience while ensuring the event met our fundraising goals. Many attendees commented it was the best cultural event they'd attended in years.",
      },
      {
        name: "Maya & John W.",
        avatar: "/placeholder.svg?height=40&width=40&text=MJW",
        rating: 4,
        date: "July 10, 2022",
        comment:
          "Our fusion wedding was beautiful and meaningful thanks to Aisha's expertise. She thoughtfully incorporated elements from both our cultures and helped our families feel included and respected. The only small issue was with timing of the ceremony, but otherwise it was perfect.",
      },
    ],
  },
]
