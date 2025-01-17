import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
// import { StartupList } from '@/components/startup-list'
import  prisma  from '@/lib/prisma'
import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { RecentTransactions } from '@/components/recent-transactions'
import { UpcomingDeadlines } from '@/components/upcoming-deadlines'

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const recentTransactions = await prisma.financialTransaction.findMany({
    include: { startup: true },
    orderBy: { date: 'desc' },
    take: 5,
  })

  const upcomingDeadlines = await prisma.deadline.findMany({
    include: { startup: true },
    orderBy: { date: 'asc' },
    where: { completed: false },
    take: 5,
  })

  return (
    // <DashboardShell>
    //   <DashboardHeader heading="Dashboard" text="Overview of your startup portfolio" />
    //   <StartupList startups={startups} />
    // </DashboardShell>
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your startup portfolio" />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentTransactions transactions={recentTransactions} />
        <UpcomingDeadlines deadlines={upcomingDeadlines} />
      </div>
    </DashboardShell>
  )
}

