// import { Deadline, Startup } from '@prisma/client'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// interface DeadlinesListProps {
//   deadlines: (Deadline & { startup: Startup })[]
// }

// export function DeadlinesList({ deadlines }: DeadlinesListProps) {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Upcoming Deadlines</h2>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Startup</TableHead>
//             <TableHead>Title</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead>Type</TableHead>
//             <TableHead>Description</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {deadlines.map((deadline) => (
//             <TableRow key={deadline.id}>
//               <TableCell>{deadline.startup.name}</TableCell>
//               <TableCell>{deadline.title}</TableCell>
//               <TableCell>{deadline.date.toLocaleDateString()}</TableCell>
//               <TableCell>{deadline.type}</TableCell>
//               <TableCell>{deadline.description || 'N/A'}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

import { Deadline, Startup } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import { completeDeadline } from '@/app/actions'

interface DeadlinesListProps {
  deadlines: (Deadline & { startup: Startup })[]
}

export function DeadlinesList({ deadlines }: DeadlinesListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Startup</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deadlines.map((deadline) => (
            <TableRow key={deadline.id}>
              <TableCell>{deadline.startup.name}</TableCell>
              <TableCell>{deadline.title}</TableCell>
              <TableCell>{new Date(deadline.date).toLocaleDateString()}</TableCell>
              <TableCell>{deadline.type}</TableCell>
              <TableCell>{deadline.description || 'N/A'}</TableCell>
              <TableCell>
                <form action={completeDeadline}>
                  <input type="hidden" name="id" value={deadline.id} />
                  <Button type="submit" size="sm" variant="outline">
                    <Check className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

