import { headers } from 'next/headers'

import { LOGIN_URL } from '@/constants/login-url'

export function buildAuthRedirectUrl() {
  const headersList = headers()
  const pathname = headersList.get('x-pathname')
  const query = pathname ? `?redirect=${encodeURIComponent(pathname)}` : ''
  return LOGIN_URL + query
}
