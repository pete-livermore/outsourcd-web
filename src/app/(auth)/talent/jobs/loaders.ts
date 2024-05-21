'use server'
import qs from 'qs'

import { env } from '@/config/env'
import { getAuthToken } from '@/lib/auth/token'

import { Job } from './page'

type PopulateParams =
  | {
      [key: string]: boolean
    }
  | Record<string, never>

export async function getJob(
  id: number,
  populate: PopulateParams = {},
): Promise<Job> {
  const token = getAuthToken()
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
