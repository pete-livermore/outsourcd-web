'use server'

import { z } from 'zod'

import { env } from '@/config/env'

import { AdditionalData, ProfileFormState } from './_components/profile-form'

const userUpdateSchema = z.object({
  // email: z.string({
  //   invalid_type_error: 'Invalid Email',
  // }),
  biography: z.string().min(1),
})

export async function updateUser(
  additionalData: AdditionalData,
  formData: FormData,
): Promise<ProfileFormState> {
  const { selectedEmail } = additionalData
  console.log('selectedEmail =>', selectedEmail)

  const userId = 6

  const rawFormData = {
    biography: formData.get('biography'),
  }

  console.log('formData =>', rawFormData)

  const validatedFields = userUpdateSchema.safeParse(rawFormData)

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const res = await fetch(`${env.SERVER_URL}/v1/users/${userId}`, {
    method: 'POST',
    body: JSON.stringify(validatedFields.data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    return { result: 'failure' }
  }

  return { result: 'success' }
}
