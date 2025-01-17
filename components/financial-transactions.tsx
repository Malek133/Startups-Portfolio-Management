import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const transactions = [
    {
      id: "1",
      startup: "TechNova",
      amount: "$1,000,000",
      date: "2023-05-15",
      type: "Investment",
    },
    {
      id: "2",
      startup: "GreenEnergy",
      amount: "$500,000",
      date: "2023-05-20",
      type: "Investment",
    },
    {
      id: "3",
      startup: "HealthPlus",
      amount: "$250,000",
      date: "2023-05-25",
      type: "Follow-up",
    },
    {
      id: "4",
      startup: "FinSmart",
      amount: "$750,000",
      date: "2023-05-30",
      type: "Investment",
    },
  ]
  
  export function FinancialTransactions() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Startup</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.startup}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  