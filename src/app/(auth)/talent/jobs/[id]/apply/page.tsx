import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

import { Heading } from '@/components/ui/heading'
import { ApiClient } from '@/lib/api/client/api-client'
import { getAuthToken } from '@/lib/auth/token'
import { authRedirect } from '@/lib/navigation/redirect'
import { JobsService } from '@/services/jobs/jobs-service'

import { CompanyInfo } from '../../_components'
import { JobApplicationForm } from './_components/application-form'

export default async function JobApplicationPage({
  params,
}: {
  params: { id: string }
}) {
  const id = parseInt(params.id)

  const token = getAuthToken()

  if (!token) {
    return authRedirect()
  }

  const jobsService = JobsService.getInstance(ApiClient.getInstance(token))
  const jobResult = await jobsService.getOne(id, { company: true })

  if (jobResult.type === 'failure') {
    if (jobResult.reason === 'not-found-error') {
      notFound()
    }
    redirect('/error/500')
  }

  const { data: job } = jobResult

  return (
    <div>
      <div className='flex justify-center'>
        <div className='space-y-6'>
          <Heading as='h1'>{job.title}</Heading>
          <div className='flex items-center'>
            <CompanyInfo name={job.company.name} />
          </div>
        </div>
      </div>
      <div className='mt-12 px-12'>
        <JobApplicationForm jobId={id} />
      </div>
    </div>
  )
}
