'use client'

import { ChevronRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import OutsourcdLogo from 'public/assets/svg/outsourcd-logo.svg'
import React, { ReactNode, useState } from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/utils/styles'

interface GettingStartedItem {
  title: string
  href: string
  description: string
}

const GETTING_STARTED_ITEMS: GettingStartedItem[] = [
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

interface ExpandingListItemProps {
  text: string
  children: ReactNode
}

function ExpandingListItem({ text, children }: ExpandingListItemProps) {
  const [isActive, setIsActive] = useState(false)

  function handleListItemClick() {
    setIsActive(!isActive)
  }

  return (
    <li onClick={handleListItemClick}>
      <div className='flex cursor-pointer items-center gap-x-2'>
        <p className='font-semibold text-black'>{text}</p>
        <ChevronRight size={16} className={cn(isActive && 'rotate-90')} />
      </div>
      <div>{isActive ? children : null}</div>
    </li>
  )
}

function MobileNavView() {
  return (
    <div className='flex grow items-center justify-end lg:hidden'>
      <div className='px-4'>
        <Sheet>
          <SheetTrigger asChild>
            <Menu className='cursor-pointer' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <OutsourcdLogo height={75} width={300} />
              <SheetDescription>
                <ul className='mt-6 space-y-4'>
                  <ExpandingListItem text='Getting started'>
                    <ul>
                      {GETTING_STARTED_ITEMS.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            className={cn(
                              'block select-none space-y-1 rounded-md p-3 leading-none text-gray-800 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                            )}
                          >
                            <div className='text-sm font-medium leading-none'>
                              {item.title}
                            </div>
                            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                              {item.description}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </ExpandingListItem>
                  <li className='cursor-pointer font-semibold text-black'>
                    Plans and pricing
                  </li>
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

const NavListItem = React.forwardRef<
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

NavListItem.displayName = 'NavListItem'

function DesktopNavView() {
  return (
    <div className='hidden grow justify-between lg:flex'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                {GETTING_STARTED_ITEMS.map((item) => (
                  <NavListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </NavListItem>
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
      <DesktopNavView />
      <MobileNavView />
    </div>
  )
}
