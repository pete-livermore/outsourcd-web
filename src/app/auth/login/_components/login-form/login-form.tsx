'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { login } from '@/app/auth/actions'
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

export function LoginForm({ className, redirectUrl }: LoginFormProps) {
  const { pending } = useFormStatus()
  const router = useRouter()
  const [state, formAction] = useFormState(login, null)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  const hasValidationErrors = state?.type === 'failure' && !!state.errors

  useEffect(() => {
    if (state) {
      if (state.type === 'success') {
        router.push(redirectUrl ?? '/')
      } else if (state.type === 'failure') {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: state.message,
        })
        if (formRef.current) {
          formRef.current.reset()
        }
      }
    }
  }, [state, router, redirectUrl, toast, pending])

  return (
    <form action={formAction} className={cn(className)} ref={formRef}>
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
            {hasValidationErrors && (
              <FormFieldErrorMessage errors={state.errors?.email} />
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
            {hasValidationErrors && (
              <FormFieldErrorMessage errors={state.errors?.password} />
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
