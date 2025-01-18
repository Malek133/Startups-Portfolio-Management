'use server'

import { revalidatePath } from 'next/cache'
import  prisma  from '@/lib/prisma'
import { AppointmentData, DeadlineData,
   StartupData, TransactionData } from '@/interface'



   export async function addTransaction(data: TransactionData) {
    try {
      const transaction = await prisma.financialTransaction.create({
        data: {
          startupId: data.startupId,
          amount: parseFloat(data.amount),
          date: new Date(data.date),
          type: data.type,
          description: data.description,
        },
      })
  
      revalidatePath('/dashboard/financials')
      return { success: true, transaction }
    } catch (error) {
      console.error('Failed to add transaction:', error)
      return { success: false, error: 'Failed to add transaction' }
    }
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

export async function addDeadline(data: DeadlineData) {
  try {
    const deadline = await prisma.deadline.create({
      data: {
        startupId: data.startupId,
        title: data.title,
        date: new Date(data.date),
        type: data.type,
        description: data.description,
      },
    })

    revalidatePath('/dashboard/schedule')
    return { success: true, deadline }
  } catch (error) {
    console.error('Failed to add deadline:', error)
    return { success: false, error: 'Failed to add deadline' }
  }
}

export async function completeDeadline(formData: FormData) {
  const id = formData.get('id') as string

  try {
    await prisma.deadline.update({
      where: { id },
      data: { completed: true },
    })

    revalidatePath('/dashboard/schedule')
  } catch (error) {
    console.error('Failed to complete deadline:', error)
  }
}



export async function addAppointment(data: AppointmentData) {
  try {
    const appointment = await prisma.appointment.create({
      data: {
        startupId: data.startupId,
        title: data.title,
        date: new Date(data.date),
        type: data.type,
        description: data.description,
      },
    })

    revalidatePath('/dashboard/schedule')
    return { success: true, appointment }
  } catch (error) {
    console.error('Failed to add appointment:', error)
    return { success: false, error: 'Failed to add appointment' }
  }
}