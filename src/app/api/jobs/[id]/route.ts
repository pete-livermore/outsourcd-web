import { getJob } from '../../../(auth)/talent/jobs/loaders'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  if (!id) {
    return
  }

  const job = await getJob(parseInt(id), { company: true })

  return Response.json({ job })
}
