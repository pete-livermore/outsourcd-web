import { redirect } from 'next/navigation'

import { buildRedirectUrl } from '@/lib/auth/redirect-url'
import { getJobs } from '@/lib/jobs/jobs'

import { JobsPanel } from './_components'

interface Filters {
  [key: string]: string[]
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const redirectUrl = buildRedirectUrl()
  const filters = Object.entries(searchParams).reduce(
    (acc: Filters, [key, value]) => {
      acc[key] = JSON.parse(value)
      return acc
    },
    {},
  )
  const jobsResult = await getJobs({
    filters,
    populate: { company: true },
  })

  if (jobsResult.type === 'failure') {
    if (jobsResult.failureReason === 'auth-error') {
      redirect(redirectUrl)
    } else {
      redirect('/error/500')
    }
  }

  const { data: jobs } = jobsResult

  return (
    <div>
      <JobsPanel jobs={jobs} />
    </div>
  )
}
