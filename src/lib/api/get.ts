import { ResultType } from '@/enums/result-type'
import { ApiResult } from '@/types/api/api-result'

import { getAuthToken } from '../auth/token'

export async function get<T>(url: string): Promise<ApiResult<T>> {
  const token = getAuthToken()
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    if (res.status === 401) {
      return {
        type: ResultType.FAILURE,
        reason: 'auth',
      }
    }
    return {
      type: ResultType.FAILURE,
      reason: 'server',
    }
  }

  const resBody = await res.json()
  return { type: ResultType.SUCCESS, data: resBody.data }
}
