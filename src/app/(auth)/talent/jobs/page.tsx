import { ApiClient } from '@/lib/api/client/api-client'
import { getAuthToken } from '@/lib/auth/token'
import { authRedirect, errorRedirect } from '@/lib/navigation/redirect'
import { JobsService } from '@/services/jobs/jobs-service'

import { JobsPanel } from './_components'

interface Filters {
  [key: string]: string[]
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const token = getAuthToken()

  if (!token) {
    return authRedirect()
  }

  const filters = Object.entries(searchParams).reduce(
    (acc: Filters, [key, value]) => {
      acc[key] = JSON.parse(value)
      return acc
    },
    {},
  )
  const jobsService = JobsService.getInstance(ApiClient.getInstance(token))
  const jobsResult = await jobsService.getMany({
    filters,
    populate: { company: true },
  })

  if (jobsResult.type === 'failure') {
    return jobsResult.reason === 'auth-error' ? authRedirect() : errorRedirect()
  }

  const jobs = jobsResult.data

  return (
    <div>
      <JobsPanel jobs={jobs} />
    </div>
  )
}
