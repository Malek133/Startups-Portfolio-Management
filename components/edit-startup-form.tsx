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
import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"
import { editStartup } from '@/app/actions'
import { Startup } from '@prisma/client'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Startup name must be at least 2 characters.",
  }),
  domain: z.string().min(2, {
    message: "Domain must be at least 2 characters.",
  }),
  creationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Creation date must be in YYYY-MM-DD format.",
  }),
  managementTeam: z.string().min(2, {
    message: "Management team must be at least 2 characters.",
  }),
  description: z.string().optional(),
})

interface EditStartupFormProps {
  startup: Startup
}

export function EditStartupForm({ startup }: EditStartupFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: startup.name,
      domain: startup.domain,
      creationDate: startup.creationDate.toISOString().split('T')[0],
      managementTeam: startup.managementTeam.join(', '),
      description: startup.description || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await editStartup(startup.id, values)
    //   toast({
    //     title: "Startup updated",
    //     description: "The startup has been successfully updated.",
    //   })
      router.push('/dashboard')
    } catch (error) {
        console.log(error)
    //   toast({
    //     title: "Error",
    //     description: "There was a problem updating the startup. Please try again.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Startup Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of the startup.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the primary domain or industry of the startup.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creation Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Enter the date when the startup was founded.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="managementTeam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Management Team</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the key members of the management team, separated by commas.
              </FormDescription>
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
                <Textarea
                  placeholder="Brief description of the startup and its goals"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a brief description of the startup (optional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Startup"}
        </Button>
      </form>
    </Form>
  )
}

