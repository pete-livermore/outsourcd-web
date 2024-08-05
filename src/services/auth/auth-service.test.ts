import { AuthService } from './auth-service'
import { createAuthService } from './auth-service-factory'

describe('Auth service', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = createAuthService()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })
})
