import { HTTPError } from '@/errors/http-error'
import { IApiClient } from '@/lib/api/client/api-client'
import { Result } from '@/types/result/result'
import { logger } from '@/utils/logging/logger'

interface JobApplicationDto {
  id: number
}

interface CreateJobApplicationDto {
  jobId: number
  userId: number
  minSalaryExpectation: number
  coverLetter: string | null
  status: string
}

interface JobApplication {
  id: number
}

export class JobApplicationsService {
  private static instance: JobApplicationsService
  private readonly jobsApiPath = '/api/v1/jobs'

  private constructor(private readonly apiClient: IApiClient) {
    this.apiClient = apiClient
  }

  public static getInstance(apiClient: IApiClient) {
    if (!JobApplicationsService.instance) {
      JobApplicationsService.instance = new JobApplicationsService(apiClient)
    }

    return JobApplicationsService.instance
  }

  private parseDto(dto: JobApplicationDto): JobApplication {
    return {
      id: dto.id,
    }
  }

  private getBaseApiPath(jobId: number) {
    return `${this.jobsApiPath}/${jobId}/applications`
  }

  async create(
    application: CreateJobApplicationDto,
  ): Promise<Result<JobApplication>> {
    const path = this.getBaseApiPath(application.jobId)
    try {
      const { data } = await this.apiClient.post<{ data: JobApplicationDto }>(
        path,
        application,
      )
      return {
        type: 'success',
        data: this.parseDto(data),
      }
    } catch (e) {
      logger.error(e)
      if (e instanceof HTTPError) {
        if (e.status === 401) {
          return {
            type: 'failure',
            reason: 'auth-error',
          }
        }
        if (e.status === 409) {
          return {
            type: 'failure',
            reason: 'resource-conflict-error',
          }
        }
      }
      return {
        type: 'failure',
        reason: 'server-error',
      }
    }
  }
}
