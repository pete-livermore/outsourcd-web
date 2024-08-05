import { ApiClient } from '@/lib/api/client/api-client'

import { UsersService } from './users-service'

export function createUsersService(token: string) {
  const apiClient = new ApiClient(token)
  return new UsersService(apiClient)
}
