"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star } from "lucide-react"
import type { Organizer } from "@/lib/mock-organizers"

interface OrganizerCardProps {
  organizer: Organizer
}

export function OrganizerCard({ organizer }: OrganizerCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-[1fr_auto]">
          <div className="flex gap-4 p-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
              <img
                src={organizer.avatar || "/placeholder.svg"}
                alt={organizer.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    <Link href={`/organizers/${organizer.id}`} className="hover:text-primary">
                      {organizer.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{organizer.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{organizer.companyName}</p>
              </div>
              <p className="text-sm">{organizer.bio}</p>
              <div className="flex flex-wrap gap-1">
                {organizer.eventTypes.slice(0, 3).map((type, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
                {organizer.eventTypes.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{organizer.eventTypes.length - 3} more
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {organizer.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {organizer.pastEvents.length} past events
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 bg-gray-50 p-4 text-center">
            <div>
              <p className="text-sm text-gray-500">{organizer.reviewCount} reviews</p>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(organizer.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href={`/organizers/${organizer.id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
