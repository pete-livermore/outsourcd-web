import qs from 'qs'

import { ApiClient } from '@/lib/api/api-client'
import { Job, JobData } from '@/models/job'

type PopulateParams =
  | {
      [key: string]: boolean
    }
  | Record<string, never>

type FilterParams = Record<string, any>

interface GetJobsParams {
  filters?: FilterParams
  populate?: PopulateParams
}

export class JobsService {
  constructor(private readonly apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  private readonly jobsApiPath = '/api/v1/jobs'

  async getOne(id: number, populate: PopulateParams | undefined = {}) {
    const basePath = `${this.jobsApiPath}/${id}`
    const query = qs.stringify({ populate })
    const apiPath = basePath + (query ? `?${query}` : '')
    const result = await this.apiClient.get<JobData>(apiPath)

    if (result.type === 'success') {
      return { type: result.type, data: new Job(result.data) }
    }
    return result
  }

  async getMany(params?: GetJobsParams) {
    const { filters = {}, populate = {} } = params || {}
    const query = qs.stringify({ filters, populate })
    const apiPath = `${this.jobsApiPath}?${query}`
    const result = await this.apiClient.get<JobData[]>(apiPath)

    if (result.type === 'success') {
      return { type: result.type, data: result.data.map((job) => new Job(job)) }
    }
    return result
  }
}
