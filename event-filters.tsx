"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationFilter } from "./location-filter"
import type { Coordinates } from "../utils/location"

interface EventFiltersProps {
  onSearchChange: (search: string) => void
  onTypeChange: (type: string) => void
  onLocationChange: (location: Coordinates | null) => void
  onRadiusChange: (radius: number) => void
  selectedType: string
}

export function EventFilters({
  onSearchChange,
  onTypeChange,
  onLocationChange,
  onRadiusChange,
  selectedType,
}: EventFiltersProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input placeholder="Search events..." className="pl-10" onChange={(e) => onSearchChange(e.target.value)} />
        </div>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="Civic Engagement">Civic Engagement</SelectItem>
            <SelectItem value="Skill Building">Skill Building</SelectItem>
            <SelectItem value="Social Gathering">Social Gathering</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <LocationFilter onLocationChange={onLocationChange} onRadiusChange={onRadiusChange} />
    </div>
  )
}

