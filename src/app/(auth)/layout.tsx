import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { LogoAnimation } from '@/components/animation/logo-animation'
import { cn } from '@/utils/styles'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to the Manageable Dashboard',
}

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <main className='flex min-h-screen items-center justify-center px-2 py-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
