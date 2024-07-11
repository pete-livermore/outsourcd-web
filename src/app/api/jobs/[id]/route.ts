import { jobsService } from '@/services/jobs'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  if (!id) {
    return
  }

  const jobResult = await jobsService.getOne(parseInt(id), { company: true })

  if (jobResult.type === 'failure') {
    if (jobResult.failureReason === 'auth-error') {
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
