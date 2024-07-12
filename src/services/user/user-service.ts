import { HTTPError } from '@/errors/http-error'
import { ApiClient } from '@/lib/api/client/api-client'
import { Result } from '@/types/result/result'
import { logger } from '@/utils/logging/logger'

export interface AuthenticatedUserDto {
  id: number
  first_name: string
  last_name: string
  email: string
}

interface AuthenticatedUser {
  id: number
  email: string
  firstName: string
  lastName: string
}

export class UserService {
  constructor(private readonly apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  private parseDto(dto: AuthenticatedUserDto) {
    return {
      id: dto.id,
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
    }
  }

  async getAuthenticatedUser(): Promise<Result<AuthenticatedUser>> {
    try {
      const data =
        await this.apiClient.get<AuthenticatedUserDto>('/api/v1/users/me')
      return {
        type: 'success',
        data: this.parseDto(data),
      }
    } catch (e) {
      logger.error(e)
      if (e instanceof HTTPError && e.status === 401) {
        return {
          type: 'failure',
          reason: 'auth-error',
        }
      }
      return {
        type: 'failure',
        reason: 'server-error',
      }
    }
  }
}
