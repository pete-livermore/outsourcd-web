import { HTTPError } from '@/errors/http-error'
import { IApiClient } from '@/lib/api/client/api-client'
import { Result } from '@/types/result/result'
import { logger } from '@/utils/logging/logger'

interface LoginDto {
  password: string
  email: string
}

interface LoginResponseDto {
  token: string
  user: {
    id: string
  }
}

interface AuthenticatedUserData {
  token: string
  user: number
}

export class AuthService {
  private static instance: AuthService | null = null

  private constructor(private readonly apiClient: IApiClient) {
    this.apiClient = apiClient
  }

  public static getInstance(apiClient: IApiClient) {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(apiClient)
    }
    return AuthService.instance
  }

  private parseDto({ token, user }: LoginResponseDto) {
    return { token, user: parseInt(user.id) }
  }

  async login(loginDto: LoginDto): Promise<Result<AuthenticatedUserData>> {
    try {
      const data = await this.apiClient.post<LoginResponseDto>(
        '/v1/auth/login',
        loginDto,
      )
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
