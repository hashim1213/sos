"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { StaffMember } from "@/lib/types"
import { Star } from "lucide-react"

interface StaffCardProps {
  staff: StaffMember
  onSelect: () => void
}

export function StaffCard({ staff, onSelect }: StaffCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-[1fr_auto]">
          <div className="flex gap-4 p-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
              <img src={staff.avatar || "/placeholder.svg"} alt={staff.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{staff.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{staff.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {staff.jobTitle} • {staff.yearsExperience} years experience
                </p>
              </div>
              <p className="text-sm">{staff.bio}</p>
              <div className="flex flex-wrap gap-1">
                {staff.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 bg-gray-50 p-4 text-center">
            <div>
              <p className="text-2xl font-bold">${staff.hourlyRate}</p>
              <p className="text-xs text-gray-500">per hour</p>
            </div>
            <Button onClick={onSelect} className="bg-primary hover:bg-primary/90">
              Select
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
