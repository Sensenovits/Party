"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.string().min(1, "Please select an event type"),
  date: z.string().min(1, "Please select a date"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  roles: z.object({
    sponsor: z.object({
      required: z.number().min(0),
      filled: z.number().default(0),
    }),
    booster: z.object({
      required: z.number().min(0),
      filled: z.number().default(0),
    }),
    crew: z.object({
      required: z.number().min(0),
      filled: z.number().default(0),
    }),
  }),
})

type EventFormValues = z.infer<typeof eventSchema>

interface EventCreationFormProps {
  onSubmit: (data: EventFormValues) => void
  onCancel: () => void
}

export function EventCreationForm({ onSubmit, onCancel }: EventCreationFormProps) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      roles: {
        sponsor: { required: 0, filled: 0 },
        booster: { required: 0, filled: 0 },
        crew: { required: 0, filled: 0 },
      },
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Civic Engagement">Civic Engagement</SelectItem>
                  <SelectItem value="Skill Building">Skill Building</SelectItem>
                  <SelectItem value="Social Gathering">Social Gathering</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Label>Required Roles</Label>
          {Object.keys(form.getValues().roles).map((role) => (
            <FormField
              key={role}
              control={form.control}
              name={`roles.${role}.required`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <Label className="capitalize w-24">{role}s</Label>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                        className="w-24"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </Form>
  )
}

