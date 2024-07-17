import { IApiClient } from '@/lib/api/client/api-client'

import { JobsService } from './jobs-service'

describe('Jobs service', () => {
  let mockApiClient: IApiClient
  let jobsService: JobsService

  beforeEach(() => {
    JobsService['instance'] = null

    mockApiClient = {
      put: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
    }

    jobsService = JobsService.getInstance(mockApiClient)
  })

  it('should be defined', () => {
    expect(jobsService).toBeDefined()
  })

  describe('when the getOne method is called', () => {
    describe('with no populate parameter', () => {
      describe('and the API client returns valid data', () => {
        beforeEach(() => {
          jest.mocked(mockApiClient).get.mockResolvedValue({
            type: 'success',
            data: {
              id: 5,
              title: 'Assistant Manager',
              description: '',
              company: { id: 17, name: 'Fake Company' },
              salary: {
                currency: 'GBP',
                value: { max: 35000, min: 25000 },
                period: 'yr',
              },
              employment_type: 'permanent',
              start_date: new Date().toISOString(),
            },
          })
        })

        it('should call apiClient.get with the constructed url path', async () => {
          const jobId = 5
          await jobsService.getOne(jobId)

          const expectedUrlPath = `/api/v1/jobs/${jobId}`
          expect(mockApiClient.get).toHaveBeenCalledWith(expectedUrlPath)
        })

        it('should return a success result with the parsed data', async () => {
          const result = await jobsService.getOne(14)

          expect(result.type).toBe('success')
          expect(result).toHaveProperty('data')
        })
      })
    })
  })
})
