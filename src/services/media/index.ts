import { ApiClient } from '@/lib/api/client/api-client'

import { MediaService } from './media-service'

export function createUsersService(token: string) {
  const apiClient = new ApiClient(token)
  return new MediaService(apiClient)
}
