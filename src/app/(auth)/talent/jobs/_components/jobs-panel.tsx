'use client'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Job } from '@/services/jobs/jobs-service'

import { JobDetail } from './job-detail'
import { JobFilters } from './job-filters'
import { JobsListItem } from './jobs-list-item'

interface JobsProps {
  jobs: Job[]
}

export function JobsPanel({ jobs }: JobsProps) {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setSelectedJob(null)
    }
  }
  return (
    <>
      <div className='mb-8 mt-10'>
        <JobFilters />
      </div>
      <div className='grid auto-rows-fr grid-cols-2 gap-8 lg:grid-cols-3 2xl:grid-cols-4'>
        {jobs.map((job) => (
          <Dialog onOpenChange={handleOpenChange} key={job.id}>
            <DialogTrigger key={job.id} onClick={() => setSelectedJob(job.id)}>
              <VisuallyHidden.Root>
                <DialogTitle>{job.title}</DialogTitle>
                <DialogDescription>
                  Detailed information for {job.title}
                </DialogDescription>
              </VisuallyHidden.Root>
              <JobsListItem
                id={job.id}
                title={job.title}
                description={job.description}
                company={job.company}
              />
            </DialogTrigger>
            <DialogContent className='min-h-[400px] sm:w-5/6'>
              {selectedJob && <JobDetail id={selectedJob} />}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  )
}
