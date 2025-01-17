"use client"

import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { toast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  type: string
  message: string
  date: Date
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Fetch notifications from the server
    const fetchNotifications = async () => {
      const response = await fetch('/api/notifications')
      const data = await response.json()
      setNotifications(data)
    }

    fetchNotifications()

    // Set up a timer to check for new notifications every minute
    const timer = setInterval(fetchNotifications, 60000)

    return () => clearInterval(timer)
  }, [])

  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read
    fetch(`/api/notifications/${notification.id}`, { method: 'PATCH' })

    // Show toast with notification details
    // toast({
    //     title: notification.type,
    //     description: notification.message,
    //   })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {notifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex flex-col">
                <span className="font-medium">{notification.type}</span>
                <span className="text-sm text-muted-foreground">{notification.message}</span>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

