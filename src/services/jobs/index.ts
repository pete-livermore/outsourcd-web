import ApiClient from '@/lib/api/api-client'

import { JobsService } from './jobs-service'

export const jobsService = new JobsService(ApiClient)
