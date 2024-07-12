import { apiClient } from '@/lib/api/client'

import { AuthService } from './auth-service'

export const authService = new AuthService(apiClient)
