import { env } from '@/config/env'

import { ApiClient } from './api-client'

export const apiClient = new ApiClient({ url: env.SERVER_URL })
