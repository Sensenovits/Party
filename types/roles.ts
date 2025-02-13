export type UserRole = "Sponsor" | "Booster" | "Spot" | "Crew" | "Motivator"

export interface RoleDefinition {
  name: UserRole
  description: string
  requirements: string[]
  icon: string
}

export const roleDefinitions: Record<UserRole, RoleDefinition> = {
  Sponsor: {
    name: "Sponsor",
    description: "Fund events and help make community gatherings possible",
    requirements: ["Verified payment method", "Company details"],
    icon: "💰",
  },
  Booster: {
    name: "Booster",
    description: "Provide resources like decorations and refreshments",
    requirements: ["Resource inventory", "Delivery capability"],
    icon: "🎉",
  },
  Spot: {
    name: "Spot",
    description: "Offer venues and spaces for events",
    requirements: ["Venue details", "Capacity information", "Safety certificates"],
    icon: "🏠",
  },
  Crew: {
    name: "Crew",
    description: "Join events and provide hands-on assistance",
    requirements: ["Basic profile", "Skills list"],
    icon: "👥",
  },
  Motivator: {
    name: "Motivator",
    description: "Organize and initiate community events",
    requirements: ["Leadership experience", "Event planning history"],
    icon: "⭐",
  },
}

