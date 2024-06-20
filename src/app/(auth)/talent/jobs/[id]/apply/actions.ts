'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import { env } from '@/config/env'
import { getAuthToken } from '@/lib/auth/token'
import { textFormFieldSchema } from '@/utils/validation/form'

import { JobApplicationFormState } from './_components/application-form'

const jobApplicationSchema = z.object({
  coverLetter: textFormFieldSchema({ nullable: true }),
  minSalaryExpectation: textFormFieldSchema(),
})

export async function sendJobApplication(
  jobId: number,
  _prevState: JobApplicationFormState,
  formData: FormData,
): Promise<JobApplicationFormState> {
  const userId = cookies().get('user')?.value

  if (!userId || !jobId) {
    return {
      result: 'failure',
      failureReason: 'server-error',
    }
  }

  const rawFormData = {
    coverLetter: formData.get('cover_letter'),
    minSalaryExpectation: formData.get('min_salary_expectation'),
  }

  const validatedFields = jobApplicationSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      result: 'failure',
      failureReason: 'validation-error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { minSalaryExpectation, coverLetter } = validatedFields.data

  const authToken = getAuthToken()

  if (!authToken) {
    return {
      result: 'failure',
      failureReason: 'auth-error',
    }
  }

  const jobApplicationDto = {
    job_id: jobId,
    user_id: parseInt(userId),
    min_salary_expectation: parseInt(minSalaryExpectation),
    cover_letter: coverLetter,
    status: 'pending',
  }

  const res = await fetch(
    `${env.SERVER_URL}/api/v1/jobs/${jobId}/applications`,
    {
      method: 'POST',
      body: JSON.stringify(jobApplicationDto),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    },
  )

  if (!res.ok) {
    if (res.status === 401) {
      return {
        result: 'failure',
        failureReason: 'auth-error',
      }
    }

    if (res.status === 409) {
      return {
        result: 'failure',
        failureReason: 'resource-conflict-error',
      }
    }

    return {
      result: 'failure',
      failureReason: 'server-error',
    }
  }

  return { result: 'success' }
}
