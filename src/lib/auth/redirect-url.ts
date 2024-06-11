import { headers } from 'next/headers'

import { REDIRECT_URL } from '@/constants/redirect-url'

export function buildRedirectUrl() {
  const headersList = headers()
  const pathname = headersList.get('x-pathname')
  const query = pathname ? `?redirect=${encodeURIComponent(pathname)}` : ''
  return REDIRECT_URL + query
}
