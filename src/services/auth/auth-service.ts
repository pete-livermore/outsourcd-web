import { HTTPError } from '@/errors/http-error'
import { IApiClient } from '@/lib/api/client/api-client'
import { LoginDto, LoginResponseDto } from '@/schema/auth'
import { Result } from '@/types/result/result'
import { logger } from '@/utils/logging/logger'

interface AuthSession {
  token: string
  user: number
}

export class AuthService {
  private apiPath: string

  constructor(private readonly apiClient: IApiClient) {
    this.apiClient = apiClient
    this.apiPath = '/v1/auth'
  }

  private parseDto({ token, user }: LoginResponseDto): AuthSession {
    return { token, user: parseInt(user.id) }
  }

  async login(loginDto: LoginDto): Promise<Result<AuthSession>> {
    try {
      const data = await this.apiClient.post<LoginResponseDto>(
        `${this.apiPath}/login`,
        loginDto,
      )
      return {
        type: 'success',
        data: this.parseDto(data),
      }
    } catch (e) {
      if (e instanceof HTTPError && e.status === 401) {
        return {
          type: 'failure',
          reason: 'auth-error',
        }
      }
      logger.error(`Login failed`, e)
      return {
        type: 'failure',
        reason: 'server-error',
      }
    }
  }
}
