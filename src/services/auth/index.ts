import { ApiClient } from '@/lib/api/client/api-client'

import { AuthService } from './auth-service'

export function createAuthService() {
  const apiClient = new ApiClient()
  return new AuthService(apiClient)
}
