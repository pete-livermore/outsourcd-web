import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import qs from 'querystring'

import { Heading } from '@/components/ui/heading'
import { env } from '@/config/env'

import { JobDetail, JobsList } from './_components'
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
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const token = cookies().get(env.AUTH_COOKIE_NAME)?.value

  if (!token) {
    return redirect('/auth/login')
  }

  const baseUrl = `${env.SERVER_URL}/api/v1/jobs`
  const query = `?populate[company]=true` + `&${qs.stringify(searchParams)}`
  const url = `${baseUrl}${query}`

  const jobsResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const jobsResponseData = await jobsResponse.json()
  const jobs: Job[] = jobsResponseData.data

  return (
    <div>
      <Heading>Jobs</Heading>
      <JobFilters />
      <div>
        {/* <JobDetail className={cn(job ? 'flex-none basis-2/5' : 'hidden')} /> */}
        <JobsList jobs={jobs} />
      </div>
    </div>
  )
}
