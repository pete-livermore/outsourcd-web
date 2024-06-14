import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import qs from 'qs'

import { env } from '@/config/env'
import { buildRedirectUrl } from '@/lib/auth/redirect-url'
import { getAuthToken } from '@/lib/auth/token'

import { JobsPanel } from './_components'

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

  const { data: jobs } = await jobsRes.json()
  const selectedJobId = searchParams.detail
    ? parseInt(searchParams.detail)
    : null

  console.log('jobs.length =>', jobs.length)

  return (
    <div>
      <JobsPanel jobs={jobs} selectedJobId={selectedJobId} />
    </div>
  )
}
