import { User, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface UserProfileProps {
  userProfile: {
    name: string
    role?: string
    rating?: number
    contributions?: string[]
    eventsJoined?: number
  }
}

export function UserProfile({ userProfile }: UserProfileProps) {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{userProfile.name}</h3>
            {userProfile.rating && userProfile.eventsJoined && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-500" />
                {userProfile.rating} · {userProfile.eventsJoined} Events
              </div>
            )}
          </div>
        </div>

        {userProfile.role && (
          <div>
            <p className="text-sm font-medium mb-2">Role:</p>
            <Badge className="mb-4">{userProfile.role}</Badge>
          </div>
        )}

        {userProfile.contributions && (
          <div>
            <p className="text-sm font-medium mb-2">Contributions:</p>
            <div className="flex flex-wrap gap-2">
              {userProfile.contributions.map((contribution) => (
                <Badge key={contribution} variant="outline">
                  {contribution}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

