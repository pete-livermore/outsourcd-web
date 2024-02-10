import { ReactNode } from 'react'

import { cn } from '@/utils/styles'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('px-10 pt-12', className)}>{children}</div>
}
