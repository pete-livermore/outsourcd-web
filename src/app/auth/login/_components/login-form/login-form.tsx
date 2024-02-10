'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { login } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export type LoginFormState =
  | {
      errors: { password?: string[]; email?: string[] }
      result?: undefined
    }
  | { errors?: undefined; result: 'success' | 'failure' }

const initialState: LoginFormState = {
  errors: { password: [], email: [] },
}

interface FormErrorMessageProps {
  errors?: string[]
}

function FormFieldErrorMessage({ errors }: FormErrorMessageProps) {
  if (!errors?.length) {
    return null
  }

  return (
    <p aria-live='polite' className='mt-1.5 text-sm text-red-600'>
      {errors?.length ? errors[0] : null}
    </p>
  )
}

export function LoginForm() {
  const { pending } = useFormStatus()
  const router = useRouter()
  const [state, formAction] = useFormState(login, initialState)
  const errors = state?.errors

  useEffect(() => {
    if (state?.result === 'success') {
      router.push('/')
    }
  }, [state, router])

  return (
    <form action={formAction}>
      <div className='flex flex-col'>
        <div className='flex flex-col space-y-8'>
          <div>
            <label htmlFor='email' className='sr-only'>
              Email address
            </label>
            <Input
              id='email'
              required
              name='email'
              type='email'
              placeholder='Enter your email'
              autoComplete='email'
            />
            <FormFieldErrorMessage errors={errors?.email} />
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='Enter your password'
              autoComplete='current-password'
            />
            <FormFieldErrorMessage errors={errors?.password} />
          </div>
        </div>
        {state.result === 'failure' && <p>Login failed</p>}
        <div className='mt-12 w-full'>
          {!pending ? (
            <Button type='submit' size='lg' className='w-full'>
              Submit
            </Button>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </form>
  )
}
