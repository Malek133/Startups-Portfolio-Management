import { FinancialTransaction, Startup } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from '@/lib/utils'

interface RecentTransactionsProps {
  transactions: (FinancialTransaction & { startup: Startup })[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.startup.name}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.type} - {transaction.date.toLocaleDateString()}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

