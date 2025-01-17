import { ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ModeToggle } from '@/components/ModeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Startups Portfolio Management',
  description: 'Manage your startup investments effectively',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className='flex justify-end items-center mx-6 my-2'>
              <ModeToggle />
            
            <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </main>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}


