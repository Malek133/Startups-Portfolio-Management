import { Deadline, Startup } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UpcomingDeadlinesProps {
  deadlines: (Deadline & { startup: Startup })[]
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{deadline.startup.name}</p>
                <p className="text-sm text-muted-foreground">
                  {deadline.title} - {deadline.date.toLocaleDateString()}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {deadline.type}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

