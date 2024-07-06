'use client'
import { format } from 'date-fns'
import { Banknote, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Job } from '@/lib/jobs/jobs'
import { capitaliseFirst } from '@/utils/data-transformation/capitalise-first'
import { cn } from '@/utils/styles'

import { CompanyInfo } from '.'

interface JobDetailProps {
  id: number
}

interface ApiError {
  message: string
}

const salaryPeriods: { [key: string]: string } = {
  mo: 'month',
  yr: 'year',
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
    return (
      <div className='flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  if (!job) {
    return null
  }

  const {
    title,
    company,
    description,
    salary,
    start_date,
    employment_type: employmentType,
  } = job
  const salaryPeriod = salaryPeriods[salary.period]
  const salaryRange = `${salary.value.min} - ${salary.value.max}`
  const salaryText = `${salaryRange} ${salary.currency} per ${salaryPeriod}`
  const startDate = format(start_date, 'io MMM yy')

  return (
    <div>
      <CardHeader>
        <CompanyInfo name={company.name} />
        <div className='space-y-4'>
          <CardTitle className='mt-4'>{title}</CardTitle>
          <div className='mt-4 flex items-center gap-x-4'>
            <div className='flex items-center gap-x-1 text-xs'>
              <Calendar />
              <p>{startDate}</p>
            </div>
            <div className='flex items-center gap-x-1 text-xs'>
              <Banknote />
              <p>{salaryText}</p>
            </div>
          </div>
          <div className='flex'>
            <Badge>{capitaliseFirst(employmentType)}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='py-4'>{description}</p>
        <Link
          href={`/talent/jobs/${id}/apply`}
          className={cn(buttonVariants())}
        >
          Apply
        </Link>
      </CardContent>
    </div>
  )
}
