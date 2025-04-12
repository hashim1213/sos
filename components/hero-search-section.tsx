"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, Calendar } from "lucide-react"

export function HeroSearchSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("professionals")
  const [professionalQuery, setProfessionalQuery] = useState("")
  const [organizerQuery, setOrganizerQuery] = useState("")

  const handleProfessionalSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/professionals?q=${encodeURIComponent(professionalQuery)}`)
  }

  const handleOrganizerSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/organizers?q=${encodeURIComponent(organizerQuery)}`)
  }

  return (
    <section className="bg-gradient-to-r from-black to-gray-900 py-8 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Hero Content Column */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                On-Demand Event Staff When You Need It Most
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Connect with qualified event staff instantly. From bartenders to security, find the perfect team for
                your next event.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/hire">Hire Staff Now</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link href="/register-professional">Apply as Staff</Link>
              </Button>
            </div>
            <div className="mt-4">
              <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:hidden">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Event+Staff"
                  alt="Event staff working at a conference"
                  className="object-cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>

          {/* Search Column */}
          <div className="flex items-center">
            <div className="w-full rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Find Your Perfect Match</h2>

              <Tabs defaultValue="professionals" onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger value="professionals" className="flex items-center gap-2">
                    <Users size={18} />
                    <span>Professionals</span>
                  </TabsTrigger>
                  <TabsTrigger value="organizers" className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>Organizers</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="professionals">
                  <form onSubmit={handleProfessionalSearch} className="space-y-4">
                    <div className="flex flex-col gap-4 md:flex-row">
                      <div className="flex-1">
                        <Input
                          placeholder="Search for bartenders, servers, security staff..."
                          value={professionalQuery}
                          onChange={(e) => setProfessionalQuery(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <Button type="submit" className="h-12 bg-primary hover:bg-primary/90">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      <span>Popular:</span>
                      <button
                        type="button"
                        onClick={() => setProfessionalQuery("Bartender")}
                        className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                      >
                        Bartender
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfessionalQuery("Server")}
                        className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                      >
                        Server
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfessionalQuery("Security")}
                        className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                      >
                        Security
                      </button>
                      <button
                        type="button"
                        onClick={() => setProfessionalQuery("AV Technician")}
                        className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                      >
                        AV Technician
                      </button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="organizers">
                  <form onSubmit={handleOrganizerSearch} className="space-y-4">
                    <div className="flex flex-col gap-4 md:flex-row">
                      <div className="flex-1">
                        <Input
                          placeholder="Search for wedding planners, corporate event managers..."
                          value={organizerQuery}
                          onChange={(e) => setOrganizerQuery(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <Button type="submit" className="h-12 bg-primary hover:bg-primary/90">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      <span>Popular:</span>
                      <button
                        type="button"
                        onClick={() => setOrganizerQuery("Wedding")}
                        className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                      >
                        Wedding
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrganizerQuery("Corporate")}
                        className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                      >
                        Corporate
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrganizerQuery("Festival")}
                        className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                      >
                        Festival
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrganizerQuery("Conference")}
                        className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                      >
                        Conference
                      </button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
