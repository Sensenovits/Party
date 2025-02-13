import { Award, Calendar, MessageSquare, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyStateProps {
  onAction?: () => void
}

export function EmptyEvents({ onAction }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="text-center py-8">
        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No events found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
        {onAction && <Button onClick={onAction}>Create an Event</Button>}
      </CardContent>
    </Card>
  )
}

export function EmptyMyEvents({ onAction }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="text-center py-8">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No events joined</h3>
        <p className="text-muted-foreground mb-4">Start participating in community events</p>
        {onAction && <Button onClick={onAction}>Browse Events</Button>}
      </CardContent>
    </Card>
  )
}

export function EmptyAchievements() {
  return (
    <Card>
      <CardContent className="text-center py-8">
        <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No achievements yet</h3>
        <p className="text-muted-foreground">Complete more events to earn achievements!</p>
      </CardContent>
    </Card>
  )
}

export function EmptyMessages() {
  return (
    <Card>
      <CardContent className="text-center py-8">
        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No messages</h3>
        <p className="text-muted-foreground">Start connecting with event organizers and participants</p>
      </CardContent>
    </Card>
  )
}

