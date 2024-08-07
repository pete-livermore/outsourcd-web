import { ApiError } from '../api/error'
import { ResultType } from './result-type'

type FailureReason = ApiError | 'validation-error'

interface BaseResult {
  type: ResultType
}

export interface SuccessResult<T = void> extends BaseResult {
  type: 'success'
  data: T extends void ? null : T
}

export interface FailureResult extends BaseResult {
  type: 'failure'
  reason: FailureReason
  errors?: string[]
}

export type Result<T = void> = SuccessResult<T> | FailureResult
