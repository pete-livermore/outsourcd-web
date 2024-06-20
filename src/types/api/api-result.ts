import { ResultType } from '@/types/result/result-type'

type FailureReason = 'auth-error' | 'server-error'

interface BaseApiResult {
  type: ResultType
}

interface SuccessfulApiResult<T> extends BaseApiResult {
  type: 'success'
  data: T extends void ? undefined : T
}
interface FailedApiResult extends BaseApiResult {
  type: 'failure'
  failureReason: FailureReason
  errors: string[]
}

export type ApiResult<T = void> = SuccessfulApiResult<T> | FailedApiResult
