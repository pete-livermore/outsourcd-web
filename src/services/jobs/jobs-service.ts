import qs from 'qs'

import { HTTPError } from '@/errors/http-error'
import { IApiClient } from '@/lib/api/client/api-client'
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

interface CompanyRelationDto {
  id: number
  name: string
}

interface SalaryDto {
  currency: string
  value: { max: number; min: number }
  period: string
}

export interface JobDto {
  id: number
  title: string
  description: string
  company: CompanyRelationDto
  salary: SalaryDto
  employment_type: string
  start_date: string
}

export interface Job {
  id: number
  title: string
  description: string
  company: CompanyRelationDto
  salary: SalaryDto
  employmentType: string
  startDate: string
}

export class JobsService {
  constructor(private readonly apiClient: IApiClient) {
    this.apiClient = apiClient
  }

  private readonly jobsApiPath = '/api/v1/jobs'

  private parseDto(dto: JobDto) {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      company: dto.company,
      salary: dto.salary,
      employmentType: dto.employment_type,
      startDate: dto.start_date,
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
