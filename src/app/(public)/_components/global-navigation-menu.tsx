'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import OutsourcdLogo from 'public/assets/svg/outsourcd-logo.svg'
import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utils/styles'

const GETTING_STARTED_ITEMS: {
  title: string
  href: string
  description: string
}[] = [
  {
    title: 'Introduction',
    href: '/getting-started/about-us',
    description: 'Find out more about us, and what we can do for your career.',
  },
  {
    title: 'How to find work',
    href: '/getting-started/how-to-find-work',
    description:
      'Understand your responsibilities and how you can maximise your chances of career success',
  },
]

export function GlobalNavigationMenu() {
  const router = useRouter()

  function handleLogoClick() {
    router.push('/')
  }

  return (
    <div className='flex'>
      <div className='cursor-pointer pt-1'>
        <OutsourcdLogo height={75} width={300} onClick={handleLogoClick} />
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                {GETTING_STARTED_ITEMS.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/plans-and-pricing' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Plans and pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
