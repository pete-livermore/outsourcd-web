interface FormErrorMessageProps {
  errors?: string[]
}

export function FormFieldErrorMessage({ errors }: FormErrorMessageProps) {
  if (!errors?.length) {
    return null
  }

  return (
    <p aria-live='polite' className='mt-1.5 text-sm text-red-600'>
      {errors?.length ? errors[0] : null}
    </p>
  )
}
