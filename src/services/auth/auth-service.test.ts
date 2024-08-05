import { createAuthService } from '.'
import { AuthService } from './auth-service'

describe('Auth service', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = createAuthService()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })
})
