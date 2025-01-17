import { DashboardNav } from "@/components/dashboard-nav"
import { Notifications } from "@/components/notifications"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1">
        <header className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold">Startup Portfolio Management</h1>
          <Notifications />
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

