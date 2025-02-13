import { Calendar, MapPin, User, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { calculateDistance, formatDistance } from "../utils/location"
import type { Coordinates } from "../utils/location"

interface Event {
  id: number
  title: string
  type: string
  date: string
  location: string
  coordinates?: Coordinates
  description: string
  organizer: {
    name: string
    rating?: number
    role?: string
  }
  roles?: {
    [key: string]: {
      required: number
      filled: number
    }
  }
}

interface EventListProps {
  events: Event[]
  userLocation?: Coordinates | null
}

export function EventList({ events, userLocation }: EventListProps) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="mb-4">
          <CardContent className="pt-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                  <MapPin className="w-4 h-4 ml-2" />
                  {event.location}
                  {userLocation && event.coordinates && (
                    <span className="text-sm text-muted-foreground">
                      ({formatDistance(calculateDistance(userLocation, event.coordinates))})
                    </span>
                  )}
                </div>
              </div>
              <Badge>{event.type}</Badge>
            </div>

            <p className="text-sm text-gray-600 mt-2">{event.description}</p>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{event.organizer.name}</span>
                {event.organizer.rating && (
                  <>
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{event.organizer.rating}</span>
                  </>
                )}
                {event.organizer.role && <Badge variant="outline">{event.organizer.role}</Badge>}
              </div>

              {event.roles && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(event.roles).map(([role, data]) => (
                    <Badge key={role} variant={data.filled < data.required ? "outline" : "secondary"}>
                      {role}: {data.filled}/{data.required}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline">Message</Button>
              <Button>Join Event</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

