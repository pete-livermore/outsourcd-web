type FormStateType = 'success' | 'failure'

interface BaseFormState {
  type: FormStateType
  message?: string
}

interface SuccessFormState extends BaseFormState {
  type: 'success'
  message?: string
}

interface FailureFormState<T extends readonly string[]> extends BaseFormState {
  type: 'failure'
  message: string
  errors?: { [key in T[number]]?: string[] }
}

export type FormState<T extends readonly string[]> =
  | SuccessFormState
  | FailureFormState<T>
