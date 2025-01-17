import { FinancialTransaction, Startup } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from '@/lib/utils'

interface FinancialTransactionsListProps {
  transactions: (FinancialTransaction & { startup: Startup })[]
}

export function FinancialTransactionsList({ transactions }: FinancialTransactionsListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Startup</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Round</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.startup.name}</TableCell>
            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
            <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell>{transaction.round || 'N/A'}</TableCell>
            <TableCell>{transaction.description || 'N/A'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

