import { ResultType } from '@/enums/result-type'

import { getJob } from '../../../(auth)/talent/jobs/loaders'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  if (!id) {
    return
  }

  const jobResult = await getJob(parseInt(id), { company: true })

  if (jobResult.type === ResultType.FAILURE) {
    if (jobResult.reason === 'auth') {
      return Response.json(
        {
          message: 'Unauthenticated',
        },
        {
          status: 401,
        },
      )
    }
    return Response.json(
      {
        message: 'Internal Server Error',
      },
      {
        status: 500,
      },
    )
  }

  const { data: job } = jobResult
  return Response.json({ job })
}
