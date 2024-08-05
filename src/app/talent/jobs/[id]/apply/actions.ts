'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import { SERVER_ERROR_MESSAGE } from '@/constants/errors/messages/server-error-message'
import { VALIDATION_ERROR_MESSAGE } from '@/constants/errors/messages/validation-error-message'
import { getAuthToken } from '@/lib/auth/token'
import { authRedirect } from '@/lib/navigation/redirect'
import { createJobApplicationsService } from '@/services/jobs/applications'
import { textFormFieldSchema } from '@/utils/validation/form'

import { JobApplicationFormState } from './_components/application-form'

const RESOURCE_CONFLICT_MESSAGE =
  'You have already applied for this job! You can access the status of your application in your dashboard'

const jobApplicationSchema = z.object({
  coverLetter: textFormFieldSchema({ nullable: true }),
  minSalaryExpectation: textFormFieldSchema(),
})

export async function sendJobApplication(
  jobId: number,
  _prevState: JobApplicationFormState | null,
  formData: FormData,
): Promise<JobApplicationFormState> {
  const userId = cookies().get('user')?.value

  if (!userId) {
    return {
      type: 'failure',
      message: 'No valid user Id',
    }
  }

  const rawFormData = {
    coverLetter: formData.get('cover_letter'),
    minSalaryExpectation: formData.get('min_salary_expectation'),
    jobId,
  }

  const validatedFields = jobApplicationSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      type: 'failure',
      message: VALIDATION_ERROR_MESSAGE,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { minSalaryExpectation, coverLetter } = validatedFields.data

  const token = getAuthToken()

  if (!token) {
    return authRedirect()
  }

  const jobApplicationDto = {
    jobId,
    userId: parseInt(userId),
    minSalaryExpectation: parseInt(minSalaryExpectation),
    coverLetter,
    status: 'pending',
  }

  const jobApplicationsService = createJobApplicationsService(token)
  const jobUpdateResult = await jobApplicationsService.create(jobApplicationDto)

  if (jobUpdateResult.type === 'failure') {
    if (jobUpdateResult.reason === 'auth-error') {
      authRedirect()
    }

    if (jobUpdateResult.reason === 'resource-conflict-error') {
      return {
        type: 'failure',
        message: RESOURCE_CONFLICT_MESSAGE,
      }
    }

    return {
      type: 'failure',
      message: SERVER_ERROR_MESSAGE,
    }
  }

  return { type: 'success', message: 'Check your applications to view status' }
}
