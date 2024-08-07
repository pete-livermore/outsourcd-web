import { ZodError } from 'zod'

import { HTTPError } from '@/errors/http-error'
import { IApiClient } from '@/lib/api/client/api-client'
import { UpdateUserDto, UserDto } from '@/schema/user'
import { FailureResult, Result } from '@/types/result/result'
import { logger } from '@/utils/logging/logger'

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  image: {
    url: string
  } | null
  biography: string
}

export class UsersService {
  private apiPath: string

  constructor(private readonly apiClient: IApiClient) {
    this.apiClient = apiClient
    this.apiPath = '/api/v1/users'
  }

  private parseDto(dto: UserDto): User {
    UserDto.parse(dto)

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
    if (e instanceof ZodError) {
      logger.error(`invalid DTO - ${JSON.stringify(e.format())}`)
      return {
        type: 'failure',
        reason: 'validation-error',
      }
    }
    if (e instanceof HTTPError && e.status === 401) {
      logger.error(e)
      return {
        type: 'failure',
        reason: 'auth-error',
      }
    }
    logger.error(e)
    return {
      type: 'failure',
      reason: 'server-error',
    }
  }

  async getAuthenticatedUser(): Promise<Result<User>> {
    try {
      const { data } = await this.apiClient.get<{ data: UserDto }>(
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
    UpdateUserDto.parse(update)

    const payload = {
      first_name: update.firstName,
      last_name: update.lastName,
      biography: update.biography,
      profile_image: update.profileImage,
    }
    try {
      await this.apiClient.patch(`${this.apiPath}/${userId}`, payload)
      return {
        type: 'success',
        data: null,
      }
    } catch (e) {
      return this.handleError(e)
    }
  }
}
