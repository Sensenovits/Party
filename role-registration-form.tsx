"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { roleDefinitions, type UserRole } from "../types/roles"
import { Label } from "@/components/ui/label" // Import Label component

const roleSchema = z.object({
  role: z.enum(["Sponsor", "Booster", "Spot", "Crew", "Motivator"] as const),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  experience: z.string().min(50, "Please provide more details about your experience"),
  // Role-specific fields
  companyName: z.string().optional(),
  paymentMethod: z.string().optional(),
  resourceTypes: z.string().optional(),
  deliveryCapability: z.boolean().optional(),
  venueAddress: z.string().optional(),
  venueCapacity: z.number().optional(),
  skills: z.string().optional(),
})

type RegistrationFormValues = z.infer<typeof roleSchema>

interface RoleRegistrationFormProps {
  onSubmit: (data: RegistrationFormValues) => void
}

export function RoleRegistrationForm({ onSubmit }: RoleRegistrationFormProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: undefined,
      name: "",
      email: "",
      phone: "",
      experience: "",
    },
  })

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role)
    form.setValue("role", role)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => handleRoleChange(value as UserRole)}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  {Object.values(roleDefinitions).map((role) => (
                    <Label
                      key={role.name}
                      className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 hover:bg-accent cursor-pointer ${
                        selectedRole === role.name ? "border-primary" : "border-muted"
                      }`}
                    >
                      <RadioGroupItem value={role.name} className="sr-only" />
                      <span className="text-2xl mb-2">{role.icon}</span>
                      <CardTitle className="text-lg mb-1">{role.name}</CardTitle>
                      <CardDescription className="text-center text-sm">{role.description}</CardDescription>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role-specific fields */}
        {selectedRole && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedRole} Requirements</CardTitle>
              <CardDescription>Please provide the following information specific to your role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedRole === "Sponsor" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Payment Method</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {selectedRole === "Booster" && (
                <>
                  <FormField
                    control={form.control}
                    name="resourceTypes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What resources can you provide?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Decorations, drinks, snacks, etc."
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {selectedRole === "Spot" && (
                <>
                  <FormField
                    control={form.control}
                    name="venueAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="venueCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue Capacity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {selectedRole === "Crew" && (
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What skills can you contribute?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List your relevant skills and experience"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your relevant experience..."
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        <Button type="submit" className="w-full">
          Register as {selectedRole || "Selected Role"}
        </Button>
      </form>
    </Form>
  )
}

