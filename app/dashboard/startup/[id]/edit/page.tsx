import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import  prisma  from '@/lib/prisma'
import { EditStartupForm } from '@/components/edit-startup-form'

export default async function EditStartupPage({ params }: { params: { id: string } }) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const startup = await prisma.startup.findUnique({
    where: { id: params.id },
  })

  if (!startup) {
    redirect('/dashboard')
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Edit Startup: {startup.name}</h1>
      <EditStartupForm startup={startup} />
    </div>
  )
}

