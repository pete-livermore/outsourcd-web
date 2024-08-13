'use client'

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
    name: string
  }
  location: {
    city: string
    country: string
  }
}

export function JobsListItem({
  id,
  title,
  description,
  location,
  company,
}: JobsListItemProps) {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  const { city, country } = location
  const locationText = `${city}, ${regionNames.of(country)}`

  return (
    <Card key={id} className='h-full cursor-pointer'>
      <CardContent className='p-3'>
        <CompanyInfo name={company.name} />
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className='text-secondary-foreground'>{locationText}</p>
        <CardDescription className='truncate'>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
