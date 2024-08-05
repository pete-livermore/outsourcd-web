import { ApiClient } from '@/lib/api/client/api-client'

import { JobsService } from './jobs-service'

export function createJobsService(token: string) {
  const apiClient = new ApiClient(token)
  return new JobsService(apiClient)
}
