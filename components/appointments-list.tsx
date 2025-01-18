// import { Appointment, Startup } from '@prisma/client'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// interface AppointmentsListProps {
//   appointments: (Appointment & { startup: Startup })[]
// }

// export function AppointmentsList({ appointments }: AppointmentsListProps) {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
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
//           {appointments.map((appointment) => (
//             <TableRow key={appointment.id}>
//               <TableCell>{appointment.startup.name}</TableCell>
//               <TableCell>{appointment.title}</TableCell>
//               <TableCell>{appointment.date.toLocaleDateString()}</TableCell>
//               <TableCell>{appointment.type}</TableCell>
//               <TableCell>{appointment.description || 'N/A'}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

import { Appointment, Startup } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AppointmentsListProps {
  appointments: (Appointment & { startup: Startup })[]
}

export function AppointmentsList({ appointments }: AppointmentsListProps) {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.startup.name}</TableCell>
              <TableCell>{appointment.title}</TableCell>
              <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>{appointment.description || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

