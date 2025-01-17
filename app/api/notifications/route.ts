import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import  prisma  from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const notifications = await prisma.notification.findMany({
    where: { userId, isRead: false },
    orderBy: { date: 'desc' },
  })

  return NextResponse.json(notifications)
}

export async function PATCH(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await req.json()

  const updatedNotification = await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  })

  return NextResponse.json(updatedNotification)
}

