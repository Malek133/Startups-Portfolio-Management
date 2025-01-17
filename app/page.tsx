import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { NewStartupForm } from '@/components/new-startup-form'

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Startup Portfolio Management</h1>
      <NewStartupForm />
    </div>
  )
}

