import { redirect } from 'next/navigation'

import { buildRedirectUrl } from '@/lib/auth/redirect-url'
import { getJobs } from '@/lib/jobs/jobs'

import { JobsPanel } from './_components'

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { detail?: string; filters?: string }
}) {
  const redirectUrl = buildRedirectUrl()
  const filters = searchParams.filters ? JSON.parse(searchParams.filters) : {}
  const jobsResult = await getJobs({ filters, populate: { company: true } })

  if (jobsResult.type === 'failure') {
    if (jobsResult.failureReason === 'auth-error') {
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
