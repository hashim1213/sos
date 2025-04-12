"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, Calendar } from "lucide-react"

export function SearchSection() {
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
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Find Your Perfect Event Match</h2>
          <p className="mb-8 text-lg text-gray-300">Search for skilled professionals or experienced event organizers</p>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <Tabs defaultValue="professionals" onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="professionals" className="flex items-center gap-2">
                  <Users size={18} />
                  <span>Find Professionals</span>
                </TabsTrigger>
                <TabsTrigger value="organizers" className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Find Organizers</span>
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
                      Search Professionals
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
                      Search Organizers
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                    <span>Popular:</span>
                    <button
                      type="button"
                      onClick={() => setOrganizerQuery("Wedding")}
                      className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                    >
                      Wedding Planner
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrganizerQuery("Corporate")}
                      className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                    >
                      Corporate Events
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrganizerQuery("Festival")}
                      className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                    >
                      Festival Coordinator
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrganizerQuery("Conference")}
                      className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                    >
                      Conference Manager
                    </button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
