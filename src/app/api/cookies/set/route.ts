import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { name, data } = await req.json()

  cookies().set(name, JSON.stringify(data))

  return Response.json({ message: 'success' })
}
