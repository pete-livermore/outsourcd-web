import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { env } from '@/config/env'

export function getToken() {
  const token = cookies().get(env.AUTH_COOKIE_NAME)?.value

  if (!token) {
    redirect('/auth/login')
  }

  return token
}
