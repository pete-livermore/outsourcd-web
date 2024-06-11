import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import qs from 'qs'

import { DialogContent } from '@/components/ui/dialog'
import { Heading } from '@/components/ui/heading'
import { env } from '@/config/env'
import { buildRedirectUrl } from '@/lib/auth/redirect-url'
import { getAuthToken } from '@/lib/auth/token'

import { JobDetail, JobsList } from './_components'
import { DialogProvider } from './_components/dialog-provider'
import { JobFilters } from './_components/job-filters'

export interface Job {
  id: number
  title: string
  description: string
  company: {
    id: number
    name: string
  }
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { detail: string | undefined }
}) {
  const redirectUrl = buildRedirectUrl()
  const token = getAuthToken()

  const filtersCookie = cookies().get('filters')
  const filters = filtersCookie ? JSON.parse(filtersCookie.value) : {}

  const baseUrl = `${env.SERVER_URL}/api/v1/jobs`
  const populate = { company: true }
  const query = qs.stringify({ filters, populate })
  const url = `${baseUrl}?${query}`

  const jobsRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!jobsRes.ok) {
    if (jobsRes.status === 401) {
      redirect(redirectUrl)
    }
    redirect('/error/500')
  }

  const jobsResBody = await jobsRes.json()
  const jobs = jobsResBody.data
  const selectedJobId = searchParams.detail
    ? parseInt(searchParams.detail)
    : null

  return (
    <div>
      <Heading>Jobs</Heading>
      <JobFilters />
      <div>
        <DialogProvider>
          <DialogContent className='sm:w-5/6'>
            {selectedJobId && <JobDetail id={selectedJobId} />}
          </DialogContent>
          <JobsList jobs={jobs} />
        </DialogProvider>
      </div>
    </div>
  )
}
