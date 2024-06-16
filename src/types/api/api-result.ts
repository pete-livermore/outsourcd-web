import { ResultType } from '@/enums/result-type'

type FailureReason = 'auth' | 'server'

interface SuccessfulApiResult<T> {
  type: ResultType.SUCCESS
  data: T
}
interface FailedApiResult {
  type: ResultType.FAILURE
  reason: FailureReason
}

export type ApiResult<T> = SuccessfulApiResult<T> | FailedApiResult
