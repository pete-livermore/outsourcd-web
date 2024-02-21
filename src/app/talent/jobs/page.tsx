import { Heading } from '@/components/ui/heading'
import { cn } from '@/utils/styles'

import { JobDetail, JobsList } from './_components'
import { JobFilters } from './_components/job-filters'

export default function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const job = searchParams.job
  const filters = searchParams.filters

  return (
    <div>
      <Heading>Jobs</Heading>
      <JobFilters />
      <div className='flex gap-x-12'>
        <JobDetail className={cn(job ? 'flex-none basis-2/5' : 'hidden')} />
        <JobsList filters={{}} />
      </div>
    </div>
  )
}
