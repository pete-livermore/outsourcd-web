import { headers } from 'next/headers'

import { buildAuthRedirectUrl } from './redirect-url'

jest.mock('next/headers', () => ({
  ...jest.requireActual('next/headers'),
  headers: jest.fn().mockReturnValue({ get: jest.fn() }),
}))

describe('buildAuthRedirectUrl', () => {
  let mockHeaders: jest.Mock

  beforeEach(() => {
    mockHeaders = jest.mocked(headers)
  })

  describe('when there is a x-pathname value in the headers', () => {
    const xPathname = '/foo/bar'

    beforeEach(() => {
      mockHeaders().get.mockReturnValue(xPathname)
    })

    it('should return the login url with the x-pathname as a redirect param', () => {
      const result = buildAuthRedirectUrl()

      expect(result).toBe(
        `/auth/login?redirect=${encodeURIComponent(xPathname)}`,
      )
    })
  })

  describe('when there is no x-pathname value in the headers', () => {
    beforeEach(() => {
      mockHeaders().get.mockReturnValue(null)
    })
    it('should return the base login url', () => {
      const result = buildAuthRedirectUrl()

      expect(result).toBe('/auth/login')
    })
  })
})
