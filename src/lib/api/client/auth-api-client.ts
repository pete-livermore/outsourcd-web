import { env } from '@/config/env'
import { getAuthToken } from '@/lib/auth/token'

import { ApiClient } from './api-client'

export const authenticatedApiClient = new ApiClient({
  url: env.SERVER_URL,
  token: getAuthToken(),
})
