// import { DashboardHeader } from "@/components/dashboard-header"
// // import { DashboardNav } from "@/components/dashboard-nav"
// import { DashboardShell } from "@/components/dashboard-shell"
// // import { FinancialTransactions } from "@/components/financial-transactions"
// import { FinancialTransactionsList } from "@/components/financial-transactions-list"
// import { Button } from "@/components/ui/button"
// import { PlusCircle } from 'lucide-react'

// export default function FinancialsPage() {
//   return (
//     <DashboardShell>
//       <DashboardHeader 
//         heading="Financial Transactions" 
//         text="Manage and track financial transactions for your startups."
//       >
//         <Button>
//           <PlusCircle className="mr-2 h-4 w-4" />
//           Add Transaction
//         </Button>
//       </DashboardHeader>
//       <FinancialTransactionsList transactions={transactions} />
//     </DashboardShell>
//     // <DashboardShell>
//     //   <DashboardNav />
//     //   <div className="flex-1 space-y-4 p-8 pt-6">
//     //     <DashboardHeader heading="Financials" text="Manage financial transactions">
//     //       <Button>
//     //         <PlusCircle className="mr-2 h-4 w-4" />
//     //         Add Transaction
//     //       </Button>
//     //     </DashboardHeader>
//     //     <FinancialTransactions />
//     //   </div>
//     // </DashboardShell>
//   )
// }

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FinancialTransactionsList } from "@/components/financial-transactions-list"
// import { Button } from "@/components/ui/button"
// import { PlusCircle } from 'lucide-react'
import  prisma  from '@/lib/prisma'
import { AddTransactionForm } from '@/components/add-transaction-form'

export default async function FinancialsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const transactions = await prisma.financialTransaction.findMany({
    include: { startup: true },
    orderBy: { date: 'desc' },
  })

  const startups = await prisma.startup.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Financial Transactions" 
        text="Manage and track financial transactions for your startups."
      />
      <AddTransactionForm startups={startups} />
      <FinancialTransactionsList transactions={transactions} />
    </DashboardShell>
  )

  // const transactions = await prisma.financialTransaction.findMany({
  //   include: { startup: true },
  //   orderBy: { date: 'desc' },
  // })

  // return (
  //   <DashboardShell>
  //     <DashboardHeader 
  //       heading="Financial Transactions" 
  //       text="Manage and track financial transactions for your startups."
  //     >
  //       <Button>
  //         <PlusCircle className="mr-2 h-4 w-4" />
  //         Add Transaction
  //       </Button>
  //     </DashboardHeader>
  //     <FinancialTransactionsList transactions={transactions} />
  //   </DashboardShell>
  // )
}

