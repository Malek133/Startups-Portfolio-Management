"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from "@/components/ui/use-toast"
import { addDeadline } from '@/app/actions'

const formSchema = z.object({
  startupId: z.string().min(1, { message: "Please select a startup" }),
  title: z.string().min(1, { message: "Title is required" }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  type: z.string().min(1, { message: "Please select a deadline type" }),
  description: z.string().optional(),
})

interface AddDeadlineFormProps {
  startups: { id: string; name: string }[]
}

export function AddDeadlineForm({ startups }: AddDeadlineFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startupId: "",
      title: "",
      date: new Date().toISOString().split('T')[0],
      type: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await addDeadline(values)
    //   toast({ title: "Deadline added successfully" })
      form.reset()
      router.refresh()
    } catch (error) {
        console.log(error)
    //   toast({ title: "Error adding deadline", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="startupId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Startup</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a startup" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {startups.map((startup) => (
                    <SelectItem key={startup.id} value={startup.id}>
                      {startup.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a deadline type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Lease Renewal">Lease Renewal</SelectItem>
                  <SelectItem value="Annual Accounts Filing">Annual Accounts Filing</SelectItem>
                  <SelectItem value="Statutory Auditor Acceptance">Statutory Auditor Acceptance</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
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
                <Input {...field} />
              </FormControl>
              <FormDescription>Optional description of the deadline</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Deadline"}
        </Button>
      </form>
    </Form>
  )
}

