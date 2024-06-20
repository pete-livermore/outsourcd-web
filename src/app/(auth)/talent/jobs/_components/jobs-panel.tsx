'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useSearchParams } from '@/hooks/search/use-search-params'
import { Job } from '@/lib/jobs/jobs'

import { JobDetail } from './job-detail'
import { JobFilters } from './job-filters'
import { JobsListItem } from './jobs-list-item'

interface JobsProps {
  jobs: Job[]
  selectedJobId: number | null
}

export function JobsPanel({ jobs, selectedJobId }: JobsProps) {
  const searchParams = useSearchParams()

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      searchParams.clear()
    }
  }
  return (
    <>
      <JobFilters />
      <div className='grid auto-rows-fr grid-cols-2 gap-8 lg:grid-cols-3 2xl:grid-cols-4'>
        {jobs.map((job) => (
          <Dialog onOpenChange={handleOpenChange} key={job.id}>
            <DialogTrigger key={job.id}>
              <JobsListItem
                id={job.id}
                title={job.title}
                description={job.description}
                company={job.company}
              />
            </DialogTrigger>
            <DialogContent className='min-h-[400px] sm:w-5/6'>
              {selectedJobId && <JobDetail id={selectedJobId} />}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  )
}
