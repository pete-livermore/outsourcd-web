import { HTTPError } from '@/errors/http-error'

import { ApiClient, IApiClient } from './api-client'

jest.mock('@/config/env', () => ({
  ...jest.requireActual('@/config/env'),
  env: {
    ...jest.requireActual('@/config/env').env,
    SERVER_URL: 'http://api.com',
  },
}))

describe('API client', () => {
  const globalFetch = global.fetch
  let apiClient: IApiClient

  beforeEach(() => {
    apiClient = ApiClient.getInstance()
  })

  afterEach(() => {
    global.fetch = globalFetch
  })

  it('should be defined', () => {
    expect(apiClient).toBeDefined()
  })

  describe('when instantiated with no token', () => {
    describe('and the get method is called', () => {
      const mockResponseBody = { data: { foo: 'bar' } }
      const mockJsonFn = jest.fn().mockResolvedValue(mockResponseBody)

      describe('and the response is ok', () => {
        beforeEach(() => {
          global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: mockJsonFn,
          }) as jest.Mock
        })

        it('should call fetch with valid url and options', async () => {
          const path = '/fake-path'
          const expectedUrl = `http://api.com${path}`

          await apiClient.get(path)

          expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        })

        it('should call res.json', async () => {
          const path = '/fake-path'

          await apiClient.get(path)

          expect(mockJsonFn).toHaveBeenCalled()
        })

        it('should return the response body returned by res.json', async () => {
          const path = '/fake-path'

          const result = await apiClient.get(path)

          expect(result).toBe(mockResponseBody)
        })
      })
      describe('and the response is not ok', () => {
        beforeEach(() => {
          global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: mockJsonFn,
          }) as jest.Mock
        })

        it('should throw an HTTPError', async () => {
          const path = '/fake-path'

          await expect(apiClient.get(path)).rejects.toThrow(HTTPError)
        })
      })
    })
    describe('and the post method is called', () => {
      const mockResponseBody = { data: { foo: 'bar' } }
      const mockJsonFn = jest.fn().mockResolvedValue(mockResponseBody)

      describe('and the response is ok', () => {
        beforeEach(() => {
          global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: mockJsonFn,
          }) as jest.Mock
        })

        it('should call fetch with correct url and options', async () => {
          const path = '/fake-path'
          const mockDto = { id: 6, foo: 'bar' }

          await apiClient.post(path, mockDto)
          expect(global.fetch).toHaveBeenCalledWith(
            'http://api.com/fake-path',
            {
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(mockDto),
              method: 'POST',
            },
          )
        })
      })
    })
    describe('and the put method is called', () => {
      const mockResponseBody = { data: { foo: 'bar' } }
      const mockJsonFn = jest.fn().mockResolvedValue(mockResponseBody)

      describe('and the response is ok', () => {
        beforeEach(() => {
          global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: mockJsonFn,
          }) as jest.Mock
        })
        it('should call fetch with correct url and options', async () => {
          const path = '/fake-path'
          const mockDto = { id: 6, foo: 'bar' }

          await apiClient.put(path, mockDto)
          expect(global.fetch).toHaveBeenCalledWith(
            'http://api.com/fake-path',
            {
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(mockDto),
              method: 'PUT',
            },
          )
        })
      })
    })
  })
})
