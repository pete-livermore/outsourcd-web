'use client'

import { CardHeader } from '@/components/ui/card'
import { CardDescription } from '@/components/ui/card'
import { CardTitle } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { useQueryParams } from '@/hooks/query/use-query-params'

import { CompanyInfo } from '.'

interface JobsListItemProps {
  id: number
  title: string
  description: string
  company: {
    id: number
    name: string
  }
}

export function JobsListItem({
  id,
  title,
  description,
  company,
}: JobsListItemProps) {
  const { set } = useQueryParams()

  function handleJobClick() {
    set('detail', id)
  }

  return (
    <Card key={id} className='h-full cursor-pointer' onClick={handleJobClick}>
      <CardContent className='p-3'>
        <CompanyInfo name={company.name} />
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='truncate'>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
