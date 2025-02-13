"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import type { Coordinates } from "../utils/location"

interface LocationFilterProps {
  onLocationChange: (location: Coordinates | null) => void
  onRadiusChange: (radius: number) => void
}

const radiusOptions = [
  { value: 5, label: "5km" },
  { value: 10, label: "10km" },
  { value: 25, label: "25km" },
  { value: 50, label: "50km" },
  { value: 100, label: "100km" },
]

export function LocationFilter({ onLocationChange, onRadiusChange }: LocationFilterProps) {
  const [isLocating, setIsLocating] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null)

  const getCurrentLocation = () => {
    setIsLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          setCurrentLocation(location)
          onLocationChange(location)
          setIsLocating(false)
          toast({
            title: "Location Updated",
            description: "Successfully got your location",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
          toast({
            title: "Location Error",
            description: "Could not get your location. Please try again.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive",
      })
      setIsLocating(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={getCurrentLocation} disabled={isLocating} className="w-[180px]">
        <MapPin className="w-4 h-4 mr-2" />
        {isLocating ? "Getting location..." : currentLocation ? "Update location" : "Use my location"}
      </Button>
      <Select onValueChange={(value) => onRadiusChange(Number(value))} defaultValue="10" disabled={!currentLocation}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Radius" />
        </SelectTrigger>
        <SelectContent>
          {radiusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

