"use client"

import { useState } from "react"
import { PlusCircle, Users, Calendar, Award, MessageSquare, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpandedProfile } from "./components/expanded-profile"
import { EventList } from "./components/event-list"
import { EventCreationForm } from "./components/event-creation-form"
import { EventFilters } from "./components/event-filters"
import { EmptyEvents, EmptyMyEvents, EmptyAchievements, EmptyMessages } from "./components/empty-states"
import { RoleRegistrationForm } from "./components/role-registration-form"
import { toast } from "@/components/ui/use-toast"
import { calculateDistance } from "./utils/location"
import type { UserRole } from "./types/roles"
import type { Coordinates } from "./utils/location"

const initialUserProfile = {
  id: "1",
  name: "Alex Thompson",
  role: "Motivator",
  bio: "Passionate about bringing people together and making a positive impact in the community.",
  avatar: "/placeholder.svg?height=96&width=96",
  location: {
    city: "San Francisco",
    neighborhood: "Mission District",
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  },
  rating: 4.7,
  skills: [
    {
      id: "1",
      name: "Event Planning",
      category: "Organization",
      level: "Expert",
      description: "Experienced in planning and executing various types of events",
      teachable: true,
      rating: 4.8,
      reviews: 15,
    },
    {
      id: "2",
      name: "Chess Teaching",
      category: "Education",
      level: "Advanced",
      description: "Can teach chess to beginners and intermediate players",
      teachable: true,
      rating: 4.6,
      reviews: 8,
    },
  ],
  resources: [
    {
      id: "1",
      name: "Community Center Space",
      type: "Location",
      description: "Available for community events and gatherings",
      availability: true,
      conditions: "Must be booked 1 week in advance",
      rating: 4.9,
      reviews: 12,
    },
  ],
  projects: [
    {
      id: "1",
      title: "Community Art Exhibition",
      status: "In Progress",
      category: "Arts & Culture",
      description: "Organizing a local art showcase featuring community artists",
      collaborators: ["Sarah Wilson", "Mike Chen"],
      skills_needed: ["Art Curation", "Event Planning"],
      resources_needed: ["Exhibition Space", "Lighting Equipment"],
    },
  ],
  availability: [
    {
      id: "1",
      day: "2025-02-15",
      startTime: "09:00",
      endTime: "17:00",
      recurring: true,
    },
  ],
  civicContributions: [
    {
      id: "1",
      title: "Beach Cleanup Initiative",
      date: "2025-01-15",
      impact: "Collected over 100kg of waste",
      hours: 4,
      verified: true,
    },
  ],
  localKnowledge: [
    {
      id: "1",
      area: "Mission District",
      expertise: ["Local History", "Cultural Events", "Food Scene"],
      languages: ["English", "Spanish"],
      rating: 4.8,
    },
  ],
  interests: ["Community Building", "Arts & Culture", "Environmental Conservation"],
  languages: ["English", "Spanish", "Mandarin"],
  achievements: ["Community Leader of the Month", "100 Hours of Civic Service", "Top Event Organizer"],
  eventsJoined: 15,
  eventsHosted: 5,
  memberSince: "January 2024",
  socialLinks: {
    linkedin: "https://linkedin.com/in/alexthompson",
    twitter: "https://twitter.com/alexthompson",
  },
  preferences: {
    notifications: true,
    visibility: "Public",
    contactMethod: "Both",
  },
} as const

const initialEvents = [
  {
    id: 1,
    title: "Community Beach Cleanup",
    type: "Civic Engagement",
    date: "2025-02-15",
    location: "Sunset Beach",
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    description: "Join our beach cleanup initiative. Together we can make our beach beautiful!",
    organizer: {
      name: "Sarah Wilson",
      rating: 4.8,
      role: "Motivator",
    },
    roles: {
      sponsor: { required: 1, filled: 0 },
      booster: { required: 2, filled: 1 },
      crew: { required: 10, filled: 4 },
    },
  },
  // Add more events with different coordinates
]

export default function PartyConnect() {
  const [userProfile, setUserProfile] = useState(initialUserProfile)
  const [events, setEvents] = useState(initialEvents)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showRoleRegistration, setShowRoleRegistration] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [searchRadius, setSearchRadius] = useState(10) // Default 10km radius

  const filteredEvents = events
    .filter((event) => {
      // Text search filter
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Type filter
      const matchesType = selectedType === "all" || event.type === selectedType

      // Location filter
      let matchesLocation = true
      if (userLocation && event.coordinates) {
        const distance = calculateDistance(userLocation, event.coordinates)
        matchesLocation = distance <= searchRadius
      }

      return matchesSearch && matchesType && matchesLocation
    })
    .sort((a, b) => {
      // Sort by distance if location is available
      if (userLocation && a.coordinates && b.coordinates) {
        const distanceA = calculateDistance(userLocation, a.coordinates)
        const distanceB = calculateDistance(userLocation, b.coordinates)
        return distanceA - distanceB
      }
      return 0
    })

  const handleCreateEvent = (formData) => {
    const newEvent = {
      ...formData,
      id: events.length + 1,
      coordinates: userLocation, // Use current user location for new events
      organizer: {
        name: userProfile.name,
        rating: userProfile.rating,
        role: userProfile.role,
      },
    }
    setEvents([...events, newEvent])
    setShowCreateEvent(false)
    toast({
      title: "Event Created",
      description: "Your event has been successfully created.",
    })
  }

  const handleRoleRegistration = (formData) => {
    setUserProfile((prev) => ({
      ...prev,
      role: formData.role as UserRole,
      // Add other relevant user data
    }))
    setShowRoleRegistration(false)
    toast({
      title: "Role Registered",
      description: `You are now registered as a ${formData.role}.`,
    })
  }

  const canCreateEvent = userProfile.role === "Motivator"

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Party Connect</h1>
        <div className="flex gap-2">
          <Dialog open={showRoleRegistration} onOpenChange={setShowRoleRegistration}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Register Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Register Your Role</DialogTitle>
              </DialogHeader>
              <RoleRegistrationForm onSubmit={handleRoleRegistration} />
            </DialogContent>
          </Dialog>

          {canCreateEvent && (
            <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <EventCreationForm onSubmit={handleCreateEvent} onCancel={() => setShowCreateEvent(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <ExpandedProfile profile={userProfile} isOwnProfile={true} />
        </div>
        <div className="col-span-2">
          <Tabs defaultValue="discover" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="discover">
                <Users className="w-4 h-4 mr-2" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="myEvents">
                <Calendar className="w-4 h-4 mr-2" />
                My Events
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="messages">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discover">
              <EventFilters
                onSearchChange={setSearchQuery}
                onTypeChange={setSelectedType}
                onLocationChange={setUserLocation}
                onRadiusChange={setSearchRadius}
                selectedType={selectedType}
              />
              {filteredEvents.length > 0 ? (
                <EventList events={filteredEvents} userLocation={userLocation} />
              ) : (
                <EmptyEvents onAction={() => setShowCreateEvent(true)} />
              )}
            </TabsContent>

            <TabsContent value="myEvents">
              <EmptyMyEvents onAction={() => setShowCreateEvent(true)} />
            </TabsContent>

            <TabsContent value="achievements">
              <EmptyAchievements />
            </TabsContent>

            <TabsContent value="messages">
              <EmptyMessages />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

