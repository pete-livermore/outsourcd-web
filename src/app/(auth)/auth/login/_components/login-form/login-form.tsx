'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { login } from '@/app/(auth)/auth/actions'
import { FormFieldErrorMessage } from '@/components/form/error/form-field-error-message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/utils/styles'

export type LoginFormState =
  | {
      errors: { password?: string[]; email?: string[] }
      result?: undefined
    }
  | { errors?: undefined; result: 'success' | 'failure' }

const initialState: LoginFormState = {
  errors: { password: [], email: [] },
}

interface LoginFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectUrl?: string
}

export function LoginForm({ className, redirectUrl }: LoginFormProps) {
  const { pending } = useFormStatus()
  const router = useRouter()
  const [state, formAction] = useFormState(login, initialState)
  const errors = state?.errors

  useEffect(() => {
    if (state?.result === 'success') {
      router.push(redirectUrl ?? '/')
    }
  }, [state, router, redirectUrl])

  return (
    <form action={formAction} className={cn(className)}>
      <div className='flex flex-col'>
        <div className='flex flex-col space-y-8'>
          <div>
            <Label htmlFor='email' className='sr-only'>
              Email address
            </Label>
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
            <Label htmlFor='password' className='sr-only'>
              Password
            </Label>
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
