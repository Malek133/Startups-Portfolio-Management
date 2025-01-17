'use server'

import { revalidatePath } from 'next/cache'
import  prisma  from '@/lib/prisma'

interface StartupData {
  name: string
  domain: string
  creationDate: string
  managementTeam: string
  description?: string
}

export async function createStartup(data: StartupData) {
  try {
    const startup = await prisma.startup.create({
      data: {
        name: data.name,
        domain: data.domain,
        creationDate: new Date(data.creationDate),
        managementTeam: data.managementTeam.split(',').map(member => member.trim()),
        description: data.description,
      },
    })

    revalidatePath('/dashboard')
    return { success: true, startup }
  } catch (error) {
    console.error('Failed to create startup:', error)
    return { success: false, error: 'Failed to create startup' }
  }
}

export async function editStartup(id: string, data: StartupData) {
  try {
    const startup = await prisma.startup.update({
      where: { id },
      data: {
        name: data.name,
        domain: data.domain,
        creationDate: new Date(data.creationDate),
        managementTeam: data.managementTeam.split(',').map(member => member.trim()),
        description: data.description,
      },
    })

    revalidatePath('/dashboard')
    return { success: true, startup }
  } catch (error) {
    console.error('Failed to edit startup:', error)
    return { success: false, error: 'Failed to edit startup' }
  }
}

export async function deleteStartup(id: string) {
  try {
    await prisma.startup.delete({
      where: { id },
    })

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete startup:', error)
    return { success: false, error: 'Failed to delete startup' }
  }
}

