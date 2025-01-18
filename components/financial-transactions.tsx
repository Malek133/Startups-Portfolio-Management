// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"
  
//   const transactions = [
//     {
//       id: "1",
//       startup: "TechNova",
//       amount: "$1,000,000",
//       date: "2023-05-15",
//       type: "Investment",
//     },
//     {
//       id: "2",
//       startup: "GreenEnergy",
//       amount: "$500,000",
//       date: "2023-05-20",
//       type: "Investment",
//     },
//     {
//       id: "3",
//       startup: "HealthPlus",
//       amount: "$250,000",
//       date: "2023-05-25",
//       type: "Follow-up",
//     },
//     {
//       id: "4",
//       startup: "FinSmart",
//       amount: "$750,000",
//       date: "2023-05-30",
//       type: "Investment",
//     },
//   ]
  
//   export function FinancialTransactions() {
//     return (
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Startup</TableHead>
//             <TableHead>Amount</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead>Type</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {transactions.map((transaction) => (
//             <TableRow key={transaction.id}>
//               <TableCell className="font-medium">{transaction.startup}</TableCell>
//               <TableCell>{transaction.amount}</TableCell>
//               <TableCell>{transaction.date}</TableCell>
//               <TableCell>{transaction.type}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     )
//   }
  
import { FinancialTransaction
  , Startup } from '@prisma/client'
import {
  Table,TableBody,TableCell,
  TableHead,TableHeader,TableRow,
} from "@/components/ui/table"
import { formatCurrency } from '@/lib/utils'

interface FinancialTransactionsListProps {
  transactions: (FinancialTransaction & { startup: Startup })[]
}

export function FinancialTransactionsList({ transactions }: FinancialTransactionsListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Startup</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.startup.name}</TableCell>
              <TableCell>{formatCurrency(transaction.amount)}</TableCell>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.description || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

