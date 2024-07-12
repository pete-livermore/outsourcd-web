import { authenticatedApiClient } from '@/lib/api/client/auth-api-client'

import { UserService } from './user-service'

export const userService = new UserService(authenticatedApiClient)
