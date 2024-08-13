import qs from 'qs'

import { HTTPError } from '@/errors/http-error'
import { IApiClient } from '@/lib/api/client/api-client'
import { JobDto } from '@/schema/job'
import { Result } from '@/types/result/result'
import { logger } from '@/utils/logging/logger'

type PopulateParams =
  | {
      [key: string]: boolean
    }
  | Record<string, never>

type FilterParams = Record<string, unknown>

interface GetJobsParams {
  filters?: FilterParams
  populate?: PopulateParams
}

export interface Job {
  id: number
  title: string
  description: string
  company: {
    name: string
  }
  salary: {
    value: {
      min: number
      max: number
    }
    currency: string
    period: string
  }
  employmentType: string
  startDate: string
  location: {
    city: string
    country: string
  }
}

export class JobsService {
  private readonly jobsApiPath = '/api/v1/jobs'

  constructor(private readonly apiClient: IApiClient) {
    this.apiClient = apiClient
  }

  private parseDto(dto: JobDto): Job {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      company: {
        name: dto.company.name,
      },
      salary: dto.salary,
      employmentType: dto.employment_type,
      startDate: dto.start_date,
      location: { city: dto.city, country: dto.country },
    }
  }

  async getOne(
    id: number,
    populate: PopulateParams | undefined = {},
  ): Promise<Result<Job>> {
    const basePath = `${this.jobsApiPath}/${id}`
    const query = qs.stringify({ populate })
    const apiPath = basePath + (query ? `?${query}` : '')

    try {
      const { data } = await this.apiClient.get<{ data: JobDto }>(apiPath)
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

  async getMany(params?: GetJobsParams): Promise<Result<Job[]>> {
    const { filters, populate } = params || {}
    const query = qs.stringify({ filters, populate })
    const apiPath = `${this.jobsApiPath}?${query}`

    try {
      const { data } = await this.apiClient.get<{ data: JobDto[] }>(apiPath)
      return {
        type: 'success',
        data: data.map((job) => this.parseDto(job)),
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
