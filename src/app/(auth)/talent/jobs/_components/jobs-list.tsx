import { DialogTrigger } from '@/components/ui/dialog'

import { Job } from '../page'
import { JobsListItem } from './jobs-list-item'

export async function JobsList({ jobs }: { jobs: Job[] }) {
  return (
    <div className='grid grid-cols-2 gap-8 lg:grid-cols-3 2xl:grid-cols-4'>
      {jobs.map((job) => (
        <DialogTrigger key={job.id}>
          <JobsListItem
            id={job.id}
            title={job.title}
            description={job.description}
            company={job.company}
          />
        </DialogTrigger>
      ))}
    </div>
  )
}
