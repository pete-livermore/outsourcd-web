'use server'
import qs from 'qs'

import { env } from '@/config/env'
import { get } from '@/lib/api/get'

import { Job } from './page'

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
  filters?: Record<string, any>
  populate?: PopulateParams
}

export async function getJobs({ filters, populate }: GetJobsParams) {
  const query = qs.stringify({ filters, populate })
  const url = `${baseJobsUrl}?${query}`
  return await get<Job[]>(url)
}
