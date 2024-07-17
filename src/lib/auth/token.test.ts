import { cookies } from 'next/headers'

import { getAuthToken } from './token'

jest.mock('next/headers', () => ({
  ...jest.requireActual('next/headers'),
  cookies: jest.fn().mockReturnValue({ get: jest.fn() }),
}))

jest.mock('@/config/env', () => ({
  ...jest.requireActual('@/config/env'),
  env: { AUTH_COOKIE_NAME: 'mock_name' },
}))

describe('getAuthToken', () => {
  const mockTokenValue = 'abcdefjjkj767767'

  describe('when the auth cookie is present', () => {
    let mockGet: jest.Mock

    beforeEach(() => {
      mockGet = jest
        .mocked(cookies().get)
        .mockReturnValue({ name: 'mock_name', value: mockTokenValue })
    })

    it('should call cookies().get with the cookie name and return the string value', () => {
      const result = getAuthToken()

      expect(mockGet).toHaveBeenCalledWith('mock_name')
      expect(result).toBe(mockTokenValue)
    })
  })

  describe('when the auth cookie is not present', () => {
    let mockGet: jest.Mock

    beforeEach(() => {
      mockGet = jest.mocked(cookies().get).mockReturnValue(undefined)
    })

    it('should call cookies().get with the cookie name and return undefined', () => {
      const result = getAuthToken()

      expect(mockGet).toHaveBeenCalledWith('mock_name')
      expect(result).toBe(undefined)
    })
  })
})
