import { Deadline, Startup } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DeadlinesListProps {
  deadlines: (Deadline & { startup: Startup })[]
}

export function DeadlinesList({ deadlines }: DeadlinesListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Deadlines</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Startup</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deadlines.map((deadline) => (
            <TableRow key={deadline.id}>
              <TableCell>{deadline.startup.name}</TableCell>
              <TableCell>{deadline.title}</TableCell>
              <TableCell>{deadline.date.toLocaleDateString()}</TableCell>
              <TableCell>{deadline.type}</TableCell>
              <TableCell>{deadline.description || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

