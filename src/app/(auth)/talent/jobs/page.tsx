import { cookies } from 'next/headers'

import { DialogContent } from '@/components/ui/dialog'
import { Heading } from '@/components/ui/heading'

import { JobDetail, JobsList } from './_components'
import { DialogProvider } from './_components/dialog-provider'
import { JobFilters } from './_components/job-filters'
import { getJobs } from './loaders'

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
  const filtersCookie = cookies().get('filters')
  const filters = filtersCookie ? JSON.parse(filtersCookie.value) : {}
  const jobs = await getJobs({ populate: { company: true }, filters })
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
