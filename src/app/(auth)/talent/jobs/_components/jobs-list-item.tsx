'use client'
import { useState } from 'react'

import { CardHeader } from '@/components/ui/card'
import { CardDescription } from '@/components/ui/card'
import { CardTitle } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'

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
  const state = useState(null)
  function handleJobClick() {
    console.log(state)
    // router.push(pathname + '?' + createQueryString('job', String(jobId)))
  }

  return (
    <Card key={id} className='cursor-pointer' onClick={handleJobClick}>
      <CardContent className='p-3'>
        <CompanyInfo name={company.name} />
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
