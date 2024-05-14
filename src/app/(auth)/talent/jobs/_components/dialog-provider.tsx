'use client'

import { PropsWithChildren } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { useQuery } from '@/hooks/query/use-query'

export function DialogProvider({ children }: PropsWithChildren) {
  const { clear } = useQuery()

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      clear()
    }
  }
  return <Dialog onOpenChange={handleOpenChange}>{children}</Dialog>
}
