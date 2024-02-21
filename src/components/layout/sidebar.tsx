import { PropsWithChildren } from 'react'

import { cn } from '@/utils/styles'

interface SidebarProps extends PropsWithChildren {
  className?: string
}

export function Sidebar({ className, children }: SidebarProps) {
  return (
    <div className={cn('min-h-screen bg-foreground px-2 py-12', className)}>
      <div className='flex flex-col text-primary-foreground'>
        <div className='mb-6'>
          {/* <ManageableLogo className='fill-accent' /> */}
        </div>
        {children}
      </div>
    </div>
  )
}
