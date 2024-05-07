import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

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
        <main>{children}</main>
      </body>
    </html>
  )
}
