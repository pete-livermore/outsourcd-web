import { Job } from '../page'
import { JobsListItem } from './jobs-list-item'

export async function JobsList({ jobs }: { jobs: Job[] }) {
  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString())
  //     params.set(name, value)

  //     return params.toString()
  //   },
  //   [searchParams],
  // )

  return (
    <div className='grid grid-cols-2 gap-8 lg:grid-cols-3 2xl:grid-cols-4'>
      {jobs.map((job) => (
        <JobsListItem
          key={job.id}
          id={job.id}
          title={job.title}
          description={job.description}
          company={job.company}
        />
      ))}
    </div>
  )
}
