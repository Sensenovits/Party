export interface Skill {
  id: string
  name: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  description: string
  teachable: boolean
  rating?: number
  reviews?: number
}

export interface Resource {
  id: string
  name: string
  type: "Physical" | "Digital" | "Location" | "Equipment"
  description: string
  availability: boolean
  conditions?: string
  rating?: number
  reviews?: number
}

export interface Project {
  id: string
  title: string
  status: "Planning" | "In Progress" | "Completed"
  category: string
  description: string
  collaborators: string[]
  skills_needed: string[]
  resources_needed: string[]
}

export interface Availability {
  id: string
  day: string
  startTime: string
  endTime: string
  recurring: boolean
}

export interface CivicContribution {
  id: string
  title: string
  date: string
  impact: string
  hours: number
  verified: boolean
}

export interface LocalKnowledge {
  id: string
  area: string
  expertise: string[]
  languages: string[]
  rating?: number
}

export interface UserProfile {
  id: string
  name: string
  role: string
  bio: string
  avatar?: string
  location: {
    city: string
    neighborhood: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  rating: number
  skills: Skill[]
  resources: Resource[]
  projects: Project[]
  availability: Availability[]
  civicContributions: CivicContribution[]
  localKnowledge: LocalKnowledge[]
  interests: string[]
  languages: string[]
  achievements: string[]
  eventsJoined: number
  eventsHosted: number
  memberSince: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    instagram?: string
    website?: string
  }
  preferences: {
    notifications: boolean
    visibility: "Public" | "Connected" | "Private"
    contactMethod: "Chat" | "Email" | "Both"
  }
}

