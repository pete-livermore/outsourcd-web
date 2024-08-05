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
  const [state, formAction] = useFormState(sendJobApplicationWithId, null)
  const { pending } = useFormStatus()
  const router = useRouter()
  const formRef = createRef<HTMLFormElement>()

  function handleRadioValueChange(value: 'yes' | 'no') {
    setUseStoredResume(value === 'yes')
  }

  useEffect(() => {
    if (state) {
      if (state.type === 'failure') {
        toast({
          variant: 'destructive',
          title: 'Sorry, your application was not submitted',
          description: state.message,
        })
        formRef.current?.reset()
      }
    }
  }, [state, router, formRef])

  if (state?.type === 'success') {
    return (
      <div className='flex w-full flex-col items-center'>
        <p className='text-lg font-semibold'>Application sent!</p>
        <p className='mt-4'>
          Check your applications to see the status of your application
        </p>
        <Button className='mt-10'>View applications</Button>
      </div>
    )
  }

  const hasValidationErrors = state?.type === 'failure' && !!state.errors

  return (
    <form className='space-y-8' action={formAction} ref={formRef}>
      <div>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='cover_letter' className='text-lg'>
            Cover letter
          </Label>
          <Textarea
            id='cover_letter'
            name='cover_letter'
            placeholder={COVER_LETTER_PLACEHOLDER_TEXT}
          />
        </div>
        {hasValidationErrors && (
          <FormFieldErrorMessage errors={state.errors?.coverLetter} />
        )}
      </div>
      <div>
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
        </div>
        {hasValidationErrors && (
          <FormFieldErrorMessage errors={state.errors?.minSalaryExpectation} />
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
      {!useStoredResume && (
        <div className='grid max-w-72 cursor-pointer items-center gap-1.5'>
          <Label htmlFor='upload_resume' className='text-lg'>
            Upload cv
          </Label>
          <Input type='file' id='upload_resume' className='cursor-pointer' />
        </div>
      )}
      <Button type='submit' disabled={pending}>
        Apply
      </Button>
    </form>
  )
}
