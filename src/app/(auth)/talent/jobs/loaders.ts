'use server'
import qs from 'qs'

import { env } from '@/config/env'
import { getToken } from '@/lib/auth/token'

import { Job } from './page'

type PopulateParams =
  | {
      [key: string]: boolean
    }
  | Record<string, never>

type FiltersParams =
  | {
      [key: string]: string | number | boolean
    }
  | Record<string, never>

type Params = { populate?: PopulateParams } & { filters?: FiltersParams }

export async function getJobs(params: Params = {}): Promise<Job[]> {
  const token = getToken()
  const baseUrl = `${env.SERVER_URL}/api/v1/jobs`
  const query = params ? `?${qs.stringify(params)}` : ''
  const url = `${baseUrl}${query}`

  const jobsRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const jobsResBody = await jobsRes.json()
  return jobsResBody.data
}

export async function getJob(
  id: number,
  populate: PopulateParams = {},
): Promise<Job> {
  const token = getToken()
  const baseUrl = `${env.SERVER_URL}/api/v1/jobs/${id}`
  const query = populate ? `?${qs.stringify({ populate })}` : ''
  const url = `${baseUrl}${query}`

  const jobRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const jobResBody = await jobRes.json()
  return jobResBody.data
}
