import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import  prisma  from '@/lib/prisma'
import { DeadlinesList } from '@/components/deadlines-list'
import { AppointmentsList } from '@/components/appointments-list'

export default async function SchedulePage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const deadlines = await prisma.deadline.findMany({
    include: { startup: true },
    orderBy: { date: 'asc' },
    where: { completed: false },
  })

  const appointments = await prisma.appointment.findMany({
    include: { startup: true },
    orderBy: { date: 'asc' },
    where: { date: { gte: new Date() } },
  })

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Schedule" 
        text="Manage deadlines and appointments for your startups."
      >
        <div className="flex space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Deadline
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Appointment
          </Button>
        </div>
      </DashboardHeader>
      <div className="grid gap-6">
        <DeadlinesList deadlines={deadlines} />
        <AppointmentsList appointments={appointments} />
      </div>
    </DashboardShell>
  )
}

