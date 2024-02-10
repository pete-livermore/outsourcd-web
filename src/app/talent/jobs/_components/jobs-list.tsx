'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { CardHeader } from '@/components/ui/card'
import { CardDescription } from '@/components/ui/card'
import { CardTitle } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'

import { CompanyInfo } from '.'

interface JobFilters {
  [key: string]: string
}

export function JobsList({ filters }: { filters: JobFilters }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // Todo use filters to make API call

  const jobs = [
    {
      id: 1,
      title: 'Marketing Manager',
      summary: 'This is a marketing job',
      sector: 'finance',
      skills: ['marketing'],
      company: {
        name: 'Company A',
      },
    },
    {
      id: 2,
      title: 'Marketing Manager',
      summary: 'This is a marketing job',
      sector: 'finance',
      skills: ['marketing'],
      company: {
        name: 'Company A',
      },
    },
    {
      id: 3,
      title: 'Marketing Manager',
      summary: 'This is a marketing job',
      sector: 'finance',
      skills: ['marketing'],
      company: {
        name: 'Company A',
      },
    },
    {
      id: 4,
      title: 'Marketing Manager',
      summary: 'This is a marketing job',
      sector: 'finance',
      skills: ['marketing'],
      company: {
        name: 'Company A',
      },
    },
    {
      id: 5,
      title: 'Marketing Manager',
      summary: 'This is a marketing job',
      sector: 'finance',
      skills: ['marketing'],
      company: {
        name: 'Company A',
      },
    },
    {
      id: 6,
      title: 'Marketing Manager',
      summary: 'This is a marketing job',
      sector: 'finance',
      skills: ['marketing'],
      company: {
        name: 'Company A',
      },
    },
  ]

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  function selectJob(jobId: number) {
    router.push(pathname + '?' + createQueryString('job', String(jobId)))
  }

  return (
    <div className='flex grow flex-wrap gap-6'>
      {jobs.map((job) => (
        <Card
          key={job.id}
          className='cursor-pointer'
          onClick={() => selectJob(job.id)}
        >
          <CardContent className='p-2'>
            <CompanyInfo name={job.company.name} />
          </CardContent>
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.summary}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
