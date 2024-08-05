import { ApiClient } from '@/lib/api/client/api-client'

import { JobApplicationsService } from './job-applications-service'

export function createJobApplicationsService(token: string) {
  const apiClient = new ApiClient(token)
  return new JobApplicationsService(apiClient)
}
