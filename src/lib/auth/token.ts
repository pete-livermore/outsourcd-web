import { cookies } from 'next/headers'

import { env } from '@/config/env'

export function getAuthToken() {
  return cookies().get(env.AUTH_COOKIE_NAME)?.value
}
