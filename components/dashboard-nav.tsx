// import Link from "next/link"
// import { usePathname } from "next/navigation"

// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"

// interface NavItem {
//   title: string
//   href: string
//   disabled?: boolean
// }

// export function DashboardNav() {
//   const pathname = usePathname()

//   const items: NavItem[] = [
//     {
//       title: "Dashboard",
//       href: "/dashboard",
//     },
//     {
//       title: "Startups",
//       href: "/dashboard/startups",
//     },
//     {
//       title: "Financials",
//       href: "/dashboard/financials",
//     },
//     {
//       title: "Appointments",
//       href: "/dashboard/appointments",
//     },
//     {
//       title: "Documents",
//       href: "/dashboard/documents",
//     },
//     {
//       title: "Stakeholders",
//       href: "/dashboard/stakeholders",
//     },
//   ]

//   return (
//     <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
//       {items.map((item) => (
//         <Link
//           key={item.href}
//           href={item.href}
//           className={cn(
//             buttonVariants({ variant: "ghost" }),
//             pathname === item.href
//               ? "bg-muted hover:bg-muted"
//               : "hover:bg-transparent hover:underline",
//             "justify-start"
//           )}
//         >
//           {item.title}
//         </Link>
//       ))}
//     </nav>
//   )
// }

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export function DashboardNav() {
  const pathname = usePathname()

  const items: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Startups",
      href: "/dashboard/startups",
    },
    {
      title: "Financials",
      href: "/dashboard/financials",
    },
    {
      title: "Schedule",
      href: "/dashboard/schedule",
    },
  ]

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

