'use client'
import { Banknote, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

import { Job } from '../page'
import { CompanyInfo } from '.'

interface JobDetailProps {
  id: number
}

interface ApiError {
  message: string
}

export function JobDetail({ id }: JobDetailProps) {
  const [job, setJob] = useState<Job | undefined>()
  const [error, setError] = useState<ApiError | undefined>()
  const isLoading = !job && !error

  useEffect(() => {
    async function setJobData() {
      const res = await fetch(`/api/jobs/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        const data = await res.json()
        setJob(data.job)
      } else {
        setError({ message: 'error' })
      }
    }

    setJobData()
  }, [id])

  if (isLoading) {
    return <Spinner />
  }

  if (!job) {
    return null
  }

  const { title, company, description } = job

  return (
    <Card>
      <CardHeader>
        <CompanyInfo name={company.name} />
        <div className='space-y-4'>
          <CardTitle className='mt-4'>{title}</CardTitle>
          <div className='mt-4 flex items-center gap-x-4'>
            <div className='flex items-center gap-x-1 text-xs'>
              <Calendar />
              <p>25th June 2024</p>
            </div>
            <div className='flex items-center gap-x-1 text-xs'>
              <Banknote />
              <p>35 K</p>
            </div>
          </div>
          <div className='flex'>
            <Badge>Permanent</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='py-4'>{description}</p>
        <Button variant='default'>Apply</Button>
      </CardContent>
    </Card>
  )
}
