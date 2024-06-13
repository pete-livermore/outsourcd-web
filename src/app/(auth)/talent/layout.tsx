import { Briefcase, CircleUserRound } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { env } from '@/config/env'
import { buildRedirectUrl } from '@/lib/auth/redirect-url'
import { getAuthToken } from '@/lib/auth/token'

import { CompanyLogo } from './_components/company-logo'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const SIDEBAR_LINKS = [
  {
    text: 'Jobs',
    href: '/talent/jobs',
    icon: <Briefcase />,
  },
  {
    text: 'Profile',
    href: '/talent/profile',
    icon: <CircleUserRound />,
  },
]

export default async function TalentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = getAuthToken()
  const redirectUrl = buildRedirectUrl()

  if (!token) {
    return redirect(redirectUrl)
  }
  const res = await fetch(`${env.SERVER_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    return redirect(redirectUrl)
  }

  const resData = await res.json()
  const { first_name, last_name } = resData.data
  const userInitials = first_name[0].toUpperCase() + last_name[0].toUpperCase()

  return (
    <div>
      <div className='fixed right-8 top-6 z-50'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src='' />
              <AvatarFallback className='font-semibold text-primary'>
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex w-full'>
        <div className='min-h-screen flex-none basis-72 bg-foreground px-2 py-12'>
          <div className='flex flex-col items-center text-primary-foreground'>
            <CompanyLogo className='mb-6' />
            <ul className='space-y-6'>
              {SIDEBAR_LINKS.map((link, i) => (
                <li key={i} className='flex w-full'>
                  <Link
                    href={link.href}
                    className='flex gap-x-2 text-muted-foreground hover:text-gray-700'
                  >
                    <span>{link.icon}</span>
                    <span>{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='grow px-8 py-6'>{children}</div>
      </div>
    </div>
  )
}
