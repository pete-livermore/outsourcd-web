import { env } from '@/config/env'
import { ApiResult } from '@/types/api/api-result'

import { getAuthToken } from '../auth/token'

export interface ApiClient {
  get<T>(url: string): Promise<ApiResult<T>>
}

async function get<T>(path: string): Promise<ApiResult<T>> {
  const token = getAuthToken()
  const res = await fetch(env.SERVER_URL + path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    if (res.status === 401) {
      return {
        type: 'failure',
        failureReason: 'auth-error',
        errors: [],
      }
    }
    return {
      type: 'failure',
      failureReason: 'server-error',
      errors: [],
    }
  }

  const resBody = await res.json()
  return { type: 'success', data: resBody.data }
}

const apiClient = { get }

export default apiClient
