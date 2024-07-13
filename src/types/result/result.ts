export type ResultType = 'success' | 'failure'

type FailureReason = 'auth-error' | 'server-error'

interface BaseResult {
  type: ResultType
}

interface SuccessResult<T = void> extends BaseResult {
  type: 'success'
  data: T extends void ? null : T
}

interface FailureResult extends BaseResult {
  type: 'failure'
  reason: FailureReason
  errors?: string[]
}

export type Result<T = void> = SuccessResult<T> | FailureResult
