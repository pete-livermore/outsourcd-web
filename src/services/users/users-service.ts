import { HTTPError } from '@/errors/http-error'
import { IApiClient } from '@/lib/api/client/api-client'
import { FailureResult, Result } from '@/types/result/result'
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

export interface UpdateUserDto {
  biography?: string
  firstName?: string
  lastName?: string
  profileImage?: number
}

export class UsersService {
  constructor(private readonly apiClient: IApiClient) {
    this.apiClient = apiClient
  }

  private parseDto(dto: AuthenticatedUserDto): AuthenticatedUser {
    return {
      id: dto.id,
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
    }
  }

  private handleError(e: unknown): FailureResult {
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

  async getAuthenticatedUser(): Promise<Result<AuthenticatedUser>> {
    try {
      const { data } = await this.apiClient.get<{ data: AuthenticatedUserDto }>(
        '/api/v1/users/me',
      )
      return {
        type: 'success',
        data: this.parseDto(data),
      }
    } catch (e) {
      return this.handleError(e)
    }
  }

  async update(userId: number, update: UpdateUserDto): Promise<Result> {
    const formattedDto = {
      first_name: update.firstName,
      last_name: update.lastName,
      biography: update.biography,
      profile_image: update.profileImage,
    }
    try {
      await this.apiClient.put(`/api/v1/users/${userId}`, formattedDto)
      return {
        type: 'success',
        data: null,
      }
    } catch (e) {
      return this.handleError(e)
    }
  }
}
