'use client'

import { useRouter } from 'next/navigation'
import { createRef, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { FormFieldErrorMessage } from '@/components/form/error/form-field-error-message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'
import { FormState } from '@/types/form/form-state'

import { sendJobApplication } from '../actions'

const COVER_LETTER_PLACEHOLDER_TEXT =
  'Let the hiring manager know why you want this job'
const SALARY_INPUT_PLACEHOLDER_TEXT = 'Minimum required annual salary'

const formFields = ['coverLetter', 'minSalaryExpectation'] as const

export type JobApplicationFormState = FormState<typeof formFields>

interface JobApplicationFormProps {
  jobId: number
}

export function JobApplicationForm({ jobId }: JobApplicationFormProps) {
  const [useStoredResume, setUseStoredResume] = useState<boolean>(true)
  const sendJobApplicationWithId = sendJobApplication.bind(null, jobId)
  const [state, formAction] = useFormState(sendJobApplicationWithId, {})
  const { pending } = useFormStatus()
  const router = useRouter()
  const formRef = createRef<HTMLFormElement>()

  function handleRadioValueChange(value: string) {
    setUseStoredResume(value === 'true')
  }

  const hasValidationErrors =
    state.result === 'failure' && state.failureReason === 'validation-error'

  useEffect(() => {
    if (state.result === 'failure') {
      switch (state.failureReason) {
        case 'auth-error': {
          router.push('/auth/login')
          break
        }
        case 'resource-conflict-error': {
          toast({
            variant: 'destructive',
            title: 'You have already applied for this job!',
            description:
              'You can access the status of your application in your dashboard',
          })
          formRef.current?.reset()
          break
        }
        default: {
          router.push('/error/500')
        }
      }
    }
  }, [state, router, formRef])

  if (state.result === 'success') {
    return (
      <div>
        <p>Application sent!</p>
        <p>Check your profile for the status of your application</p>
      </div>
    )
  }

  return (
    <form className='space-y-8' action={formAction} ref={formRef}>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='cover_letter' className='text-lg'>
          Cover letter
        </Label>
        <Textarea
          id='cover_letter'
          name='cover_letter'
          placeholder={COVER_LETTER_PLACEHOLDER_TEXT}
        />
        {hasValidationErrors && (
          <FormFieldErrorMessage errors={state.errors.coverLetter} />
        )}
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='min_salary_expectation' className='text-lg'>
          Salary expectations
        </Label>
        <Input
          id='min_salary_expectation'
          type='number'
          name='min_salary_expectation'
          placeholder={SALARY_INPUT_PLACEHOLDER_TEXT}
        />
        {hasValidationErrors && (
          <FormFieldErrorMessage errors={state.errors.minSalaryExpectation} />
        )}
      </div>
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor='resume_question' className='text-lg'>
          Include saved CV in your application?
        </Label>
        <RadioGroup
          defaultValue='yes'
          className='flex'
          id='resume_question'
          onValueChange={handleRadioValueChange}
        >
          <RadioGroupItem value='yes' id='yes' />
          <Label htmlFor='yes'>Yes</Label>
          <RadioGroupItem value='no' id='no' />
          <Label htmlFor='no'>No</Label>
        </RadioGroup>
      </div>
      {useStoredResume && (
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='upload_resume' className='text-lg'>
            Upload cv
          </Label>
          <Input type='file' id='upload_resume' />
        </div>
      )}
      <Button type='submit' disabled={pending}>
        Apply
      </Button>
    </form>
  )
}
