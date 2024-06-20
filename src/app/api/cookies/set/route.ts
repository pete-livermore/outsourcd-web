import { NextResponse } from 'next/server'
import { z } from 'zod'

const setCookieSchema = z.object({
  name: z.string(),
  value: z.any(),
  httpOnly: z.boolean().optional(),
  path: z.string().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  setCookieSchema.parse(body)

  const { name, value, ...options } = body

  const response = NextResponse.json(
    {},
    { status: 200, statusText: 'Set cookie successfully' },
  )

  response.cookies.set({
    name: name,
    value: value,
    ...options,
  })

  return response
}
