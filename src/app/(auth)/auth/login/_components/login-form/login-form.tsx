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
import { useToast } from '@/components/ui/toast'
import { FormState } from '@/types/form/form-state'
import { cn } from '@/utils/styles'

const formFields = ['password', 'email'] as const
export type LoginFormState = FormState<typeof formFields>

interface LoginFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectUrl?: string
}

const ERROR_MESSAGES: { [key: string]: string } = {
  'auth-error': 'The provided credentials are invalid',
  'server-error': 'There was an unknown error',
}

export function LoginForm({ className, redirectUrl }: LoginFormProps) {
  const { pending } = useFormStatus()
  const router = useRouter()
  const [state, formAction] = useFormState(login, {})
  const { toast } = useToast()

  const hasFailedValidation =
    state.result === 'failure' && state.failureReason === 'validation-error'

  useEffect(() => {
    if (state.result === 'success') {
      router.push(redirectUrl ?? '/')
    }

    if (state.result === 'failure') {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: ERROR_MESSAGES[state.failureReason],
      })
    }
  }, [state, router, redirectUrl, toast])

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
            {hasFailedValidation && (
              <FormFieldErrorMessage errors={state.errors.email} />
            )}
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
            {hasFailedValidation && (
              <FormFieldErrorMessage errors={state.errors.password} />
            )}
          </div>
        </div>
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
