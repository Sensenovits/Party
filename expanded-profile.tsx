"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, MessageSquare, Settings, CalendarIcon, Trophy, CheckCircle } from "lucide-react"
import type { UserProfile } from "../types/profile"

interface ExpandedProfileProps {
  profile: UserProfile
  isOwnProfile?: boolean
}

export function ExpandedProfile({ profile, isOwnProfile = false }: ExpandedProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {profile.location.city}, {profile.location.neighborhood}
                    </span>
                  </div>
                </div>
                {isOwnProfile ? (
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{profile.rating}</span>
                </div>
                <Badge variant="outline">{profile.role}</Badge>
                <span className="text-sm text-muted-foreground">Member since {profile.memberSince}</span>
              </div>
              <p className="mt-4 text-muted-foreground">{profile.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-6 gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Events Hosted</span>
                    <span className="font-medium">{profile.eventsHosted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Events Joined</span>
                    <span className="font-medium">{profile.eventsJoined}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Skills Shared</span>
                    <span className="font-medium">{profile.skills.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement} className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          {profile.skills.map((skill) => (
            <Card key={skill.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge>{skill.category}</Badge>
                      <Badge variant="outline">{skill.level}</Badge>
                      {skill.teachable && <Badge variant="secondary">Available to Teach</Badge>}
                    </div>
                  </div>
                  {skill.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{skill.rating}</span>
                      <span className="text-sm text-muted-foreground">({skill.reviews} reviews)</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          {profile.resources.map((resource) => (
            <Card key={resource.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge>{resource.type}</Badge>
                      <Badge variant={resource.availability ? "secondary" : "outline"}>
                        {resource.availability ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    {resource.conditions && <p className="mt-2 text-sm">Conditions: {resource.conditions}</p>}
                  </div>
                  {resource.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{resource.rating}</span>
                      <span className="text-sm text-muted-foreground">({resource.reviews} reviews)</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          {profile.projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <Badge>{project.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium">Skills Needed:</label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {project.skills_needed.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Resources Needed:</label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {project.resources_needed.map((resource) => (
                          <Badge key={resource} variant="outline">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Collaborators:</label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {project.collaborators.map((collaborator) => (
                          <Badge key={collaborator} variant="secondary">
                            {collaborator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>View and manage availability for activities and collaborations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-4">Available Time Slots</h4>
                  <div className="space-y-2">
                    {profile.availability
                      .filter((slot) => slot.day === selectedDate?.toISOString().split("T")[0])
                      .map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between p-2 rounded-md border">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                          {slot.recurring && <Badge variant="outline">Recurring</Badge>}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Civic Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.civicContributions.map((contribution) => (
                    <div key={contribution.id} className="flex items-start justify-between p-2 rounded-md border">
                      <div>
                        <h4 className="font-medium">{contribution.title}</h4>
                        <p className="text-sm text-muted-foreground">{contribution.impact}</p>
                        <div className="mt-1 flex items-center gap-2 text-sm">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{contribution.date}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{contribution.hours} hours</span>
                        </div>
                      </div>
                      {contribution.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Local Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.localKnowledge.map((knowledge) => (
                    <div key={knowledge.id} className="space-y-2 p-2 rounded-md border">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{knowledge.area}</h4>
                        {knowledge.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{knowledge.rating}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium">Expertise:</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {knowledge.expertise.map((exp) => (
                            <Badge key={exp} variant="outline">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Languages:</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {knowledge.languages.map((lang) => (
                            <Badge key={lang} variant="secondary">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

