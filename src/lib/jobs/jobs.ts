import qs from 'qs'

import { env } from '@/config/env'
import { get } from '@/lib/api/get'

export interface Job {
  id: number
  title: string
  description: string
  company: {
    id: number
    name: string
  }
  salary: {
    currency: string
    value: { max: number; min: number }
    period: string
  }
  employment_type: string
  start_date: string
}

type PopulateParams =
  | {
      [key: string]: boolean
    }
  | Record<string, never>

const baseJobsUrl = `${env.SERVER_URL}/api/v1/jobs`

export async function getJob(id: number, populate: PopulateParams = {}) {
  const baseUrl = `${baseJobsUrl}/${id}`
  const query = populate ? `?${qs.stringify({ populate })}` : ''
  const url = `${baseUrl}${query}`
  return await get<Job>(url)
}

interface GetJobsParams {
  filters?: object
  populate?: PopulateParams
}

export async function getJobs({ filters, populate }: GetJobsParams) {
  const query = qs.stringify({ filters, populate })
  const url = `${baseJobsUrl}?${query}`
  return await get<Job[]>(url)
}
