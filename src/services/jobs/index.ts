import { authenticatedApiClient } from '@/lib/api/client/auth-api-client'

import { JobsService } from './jobs-service'

export const jobsService = new JobsService(authenticatedApiClient)
