import { HTTPError } from '@/errors/http-error'
import { IApiClient } from '@/lib/api/client/api-client'
import { FailureResult, Result } from '@/types/result/result'
import { logger } from '@/utils/logging/logger'

export interface AuthenticatedUserDto {
  id: number
  first_name: string
  last_name: string
  email: string
  profile_image: {
    id: number
    url: string
  }
  biography: string
}

interface AuthenticatedUser {
  id: number
  email: string
  firstName: string
  lastName: string
  image: {
    url: string
  } | null
  biography: string
}

export interface UpdateUserDto {
  biography?: string
  firstName?: string
  lastName?: string
  profileImage?: number
}

export class UsersService {
  private apiPath: string

  constructor(private readonly apiClient: IApiClient) {
    this.apiClient = apiClient
    this.apiPath = '/api/v1/users'
  }

  // Todo: validate DTO
  private parseDto(dto: AuthenticatedUserDto): AuthenticatedUser {
    const image = dto.profile_image ? { url: dto.profile_image.url } : null

    return {
      id: dto.id,
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
      image,
      biography: dto.biography,
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
        `${this.apiPath}/me`,
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
      await this.apiClient.patch(`${this.apiPath}/${userId}`, formattedDto)
      return {
        type: 'success',
        data: null,
      }
    } catch (e) {
      return this.handleError(e)
    }
  }
}
