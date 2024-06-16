import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ResultType } from '@/enums/result-type'
import { buildRedirectUrl } from '@/lib/auth/redirect-url'

import { JobsPanel } from './_components'
import { getJobs } from './loaders'

export interface Job {
  id: number
  title: string
  description: string
  company: {
    id: number
    name: string
  }
  salary: {
    currency: string
    value: { max: number; min: number }
    period: string
  }
  start_date: string
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { detail: string | undefined }
}) {
  const redirectUrl = buildRedirectUrl()
  const filtersCookie = cookies().get('filters')
  const filters = filtersCookie ? JSON.parse(filtersCookie.value) : {}

  const jobsResult = await getJobs({ filters, populate: { company: true } })

  if (jobsResult.type === ResultType.FAILURE) {
    if (jobsResult.reason === 'auth') {
      redirect(redirectUrl)
    } else {
      redirect('/error/500')
    }
  }

  const { data: jobs } = jobsResult
  const selectedJobId = searchParams.detail
    ? parseInt(searchParams.detail)
    : null

  return (
    <div>
      <JobsPanel jobs={jobs} selectedJobId={selectedJobId} />
    </div>
  )
}
