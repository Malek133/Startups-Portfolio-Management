import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { StartupList } from '@/components/startup-list'
import prisma from '@/lib/prisma'


export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const startups = await prisma.startup.findMany({
    orderBy: { creationDate: 'desc' },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your startup portfolio" />
      <StartupList startups={startups} />
    </DashboardShell>
  )
}

