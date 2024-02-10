import '@/styles/globals.css'
import { Inter as FontSans } from 'next/font/google'
import type { Metadata } from 'next'

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
    <div className='flex min-h-screen'>
      <main className='flex basis-full justify-center px-2 py-4 md:basis-1/2'>
        {children}
      </main>
      <div className='hidden grow p-12 md:block'>
        <LogoAnimation className='h-full' />
      </div>
    </div>
  )
}
