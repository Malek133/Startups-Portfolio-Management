export interface StartupData {
    name: string
    domain: string
    creationDate: string
    managementTeam: string
    description?: string
  }
  
  export interface TransactionData {
    startupId: string
    amount: string
    date: string
    type: string
    description?: string
  }
  
  export interface DeadlineData {
    startupId: string
    title: string
    date: string
    type: string
    description?: string
  }

  export interface AppointmentData {
    startupId: string
    title: string
    date: string
    type: string
    description?: string
  }