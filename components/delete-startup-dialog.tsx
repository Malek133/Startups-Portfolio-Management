"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from 'lucide-react'
import { deleteStartup } from '@/app/actions'
// import { useToast } from "@/components/ui/use-toast"

interface DeleteStartupDialogProps {
  startupId: string
  startupName: string
}

export function DeleteStartupDialog({ startupId, startupName }: DeleteStartupDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
//   const { toast } = useToast()

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteStartup(startupId)
    setIsDeleting(false)
    setIsOpen(false)

    if (result.success) {
    //   toast({
    //     title: "Startup deleted",
    //     description: `${startupName} has been successfully deleted.`,
    //   })
    } else {
    //   toast({
    //     title: "Error",
    //     description: "There was a problem deleting the startup. Please try again.",
    //     variant: "destructive",
    //   })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete {startupName}?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the startup and all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

