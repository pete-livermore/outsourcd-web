import { ResultType } from '../result/result'

type SubmissionFailureReason =
  | 'validation-error'
  | 'auth-error'
  | 'server-error'
  | 'resource-conflict-error'

interface BaseFormState {
  result: ResultType
}

interface SuccessfulSubmissionState extends BaseFormState {
  result: 'success'
}

interface BaseFailedSubmissionState {
  result: 'failure'
  reason: SubmissionFailureReason
}

interface ValidationErrorState<T extends readonly string[]>
  extends BaseFailedSubmissionState {
  reason: 'validation-error'
  errors: { [key in T[number]]?: string[] }
}

interface AuthErrorState extends BaseFailedSubmissionState {
  reason: 'auth-error'
}

interface ResourceConflictErrorState extends BaseFailedSubmissionState {
  reason: 'resource-conflict-error'
}

interface ServerErrorState extends BaseFailedSubmissionState {
  reason: 'server-error'
  errors?: unknown[]
}

type FailedSubmissionState<T extends readonly string[]> =
  | ValidationErrorState<T>
  | AuthErrorState
  | ServerErrorState
  | ResourceConflictErrorState

export type FormState<T extends readonly string[]> =
  | SuccessfulSubmissionState
  | FailedSubmissionState<T>
  | Record<string, never>
