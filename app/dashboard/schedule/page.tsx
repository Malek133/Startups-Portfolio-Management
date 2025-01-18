// import { auth } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation'
// import { DashboardHeader } from '@/components/dashboard-header'
// import { DashboardShell } from '@/components/dashboard-shell'
// import { Button } from '@/components/ui/button'
// import { PlusCircle } from 'lucide-react'
// import  prisma  from '@/lib/prisma'
// import { DeadlinesList } from '@/components/deadlines-list'
// import { AppointmentsList } from '@/components/appointments-list'

// export default async function SchedulePage() {
//   const { userId } = await auth()

//   if (!userId) {
//     redirect('/sign-in')
//   }

//   const deadlines = await prisma.deadline.findMany({
//     include: { startup: true },
//     orderBy: { date: 'asc' },
//     where: { completed: false },
//   })

//   const appointments = await prisma.appointment.findMany({
//     include: { startup: true },
//     orderBy: { date: 'asc' },
//     where: { date: { gte: new Date() } },
//   })

//   return (
//     <DashboardShell>
//       <DashboardHeader 
//         heading="Schedule" 
//         text="Manage deadlines and appointments for your startups."
//       >
//         <div className="flex space-x-2">
//           <Button>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             Add Deadline
//           </Button>
//           <Button>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             Add Appointment
//           </Button>
//         </div>
//       </DashboardHeader>
//       <div className="grid gap-6">
//         <DeadlinesList deadlines={deadlines} />
//         <AppointmentsList appointments={appointments} />
//       </div>
//     </DashboardShell>
//   )
// }

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DeadlinesList } from "@/components/deadlines-list"
import { AppointmentsList } from "@/components/appointments-list"
import { AddDeadlineForm } from "@/components/add-deadline-form"
import { AddAppointmentForm } from "@/components/add-appointment-form"
import  prisma  from '@/lib/prisma'

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

  const startups = await prisma.startup.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Schedule" 
        text="Manage deadlines and appointments for your startups."
      />
      <div className="grid gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Deadlines</h2>
          <AddDeadlineForm startups={startups} />
          <DeadlinesList deadlines={deadlines} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Appointments</h2>
          <AddAppointmentForm startups={startups} />
          <AppointmentsList appointments={appointments} />
        </div>
      </div>
    </DashboardShell>
  )
}

