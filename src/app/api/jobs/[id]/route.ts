import { getAuthToken } from '@/lib/auth/token'
import { generateErrResponse } from '@/lib/response/generate-error-response'
import { createJobsService } from '@/services/jobs'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const token = getAuthToken()

  if (!token) {
    return generateErrResponse('unauthenticated')
  }

  const { id } = params

  if (!id) {
    return
  }

  const jobsService = createJobsService(token)
  const jobResult = await jobsService.getOne(parseInt(id), { company: true })

  if (jobResult.type === 'failure') {
    if (jobResult.reason === 'auth-error') {
      return generateErrResponse('unauthenticated')
    }
    return generateErrResponse('server')
  }

  const { data: job } = jobResult
  return Response.json({ job })
}
