'use client'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { cva } from 'class-variance-authority'
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
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useScroll } from '@/hooks/scroll/use-scroll'
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
            <Menu className='cursor-pointer' color='white' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <OutsourcdLogo height={75} width={300} />
              <VisuallyHidden.Root>
                <SheetTitle className='invisible'>Edit profile</SheetTitle>
                <SheetDescription className='invisible'>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </VisuallyHidden.Root>
            </SheetHeader>
            <ul className='mt-6 space-y-4'>
              <ExpandingListItem text='Getting started'>
                <ul>
                  {GETTING_STARTED_ITEMS.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className={cn(
                          'block select-none space-y-1 rounded-md px-2 pt-4 leading-none text-gray-800 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
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

const navStyles = cva([], {
  variants: {
    background: {
      light: 'bg-background',
      dark: 'bg-transparent',
    },
    text: {
      light: 'text-black',
      dark: 'text-primary-foreground',
    },
  },
})

interface DesktopNavViewProps {
  colorScheme: 'light' | 'dark'
}

function DesktopNavView({ colorScheme }: DesktopNavViewProps) {
  return (
    <div className='hidden grow justify-between lg:flex'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={navStyles({ text: colorScheme })}>
              Getting started
            </NavigationMenuTrigger>
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
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  navStyles({ text: colorScheme }),
                )}
              >
                Plans and pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

interface GlobalNavigationMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function GlobalNavigationMenu({ className }: GlobalNavigationMenuProps) {
  const { scrollPosition } = useScroll()
  const colorScheme = scrollPosition.top > 0 ? 'light' : 'dark'
  const router = useRouter()

  function handleLogoClick() {
    router.push('/')
  }

  return (
    <div
      className={cn('flex', navStyles({ background: colorScheme }), className)}
    >
      <div className='cursor-pointer py-3'>
        <OutsourcdLogo height={55} width={300} onClick={handleLogoClick} />
      </div>
      <DesktopNavView colorScheme={colorScheme} />
      <MobileNavView />
    </div>
  )
}
