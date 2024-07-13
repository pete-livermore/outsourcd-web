import { ERRORS } from '@/constants/errors/errors'

export function generateErrResponse(key: keyof typeof ERRORS) {
  return Response.json(
    {
      message: ERRORS[key].message,
    },
    {
      status: ERRORS[key].status,
    },
  )
}
