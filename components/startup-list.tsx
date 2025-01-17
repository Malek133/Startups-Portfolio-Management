import { Startup } from '@prisma/client'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'
import { DeleteStartupDialog } from './delete-startup-dialog'

interface StartupListProps {
  startups: Startup[]
}

export function StartupList({ startups }: StartupListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {startups.map((startup) => (
        <Card key={startup.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {startup.name}
              <div className="space-x-2">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/dashboard/startups/${startup.id}/edit`}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <DeleteStartupDialog startupId={startup.id} startupName={startup.name} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Domain:</strong> {startup.domain}</p>
            <p><strong>Created:</strong> {startup.creationDate.toDateString()}</p>
            <p><strong>Team:</strong> {startup.managementTeam.join(', ')}</p>
            {startup.description && (
              <p className="mt-2">{startup.description}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

