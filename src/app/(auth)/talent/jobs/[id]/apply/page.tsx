import { redirect } from 'next/navigation'

import { Heading } from '@/components/ui/heading'
import { getJob } from '@/lib/jobs/jobs'

import { CompanyInfo } from '../../_components'
import { JobApplicationForm } from './_components/application-form'

export default async function JobApplicationPage({
  params,
}: {
  params: { id: string }
}) {
  const id = parseInt(params.id)
  const jobResult = await getJob(id, { company: true })

  if (jobResult.type === 'failure') {
    redirect('/error/500')
  }

  const { data: job } = jobResult

  return (
    <div>
      <div className='flex justify-center'>
        <div className='space-y-6'>
          <Heading as='h1'>{job.title}</Heading>
          <div className='flex justify-center'>
            <CompanyInfo name={job.company.name} />
          </div>
        </div>
      </div>
      <div className='mt-12'>
        <JobApplicationForm jobId={id} />
      </div>
    </div>
  )
}
