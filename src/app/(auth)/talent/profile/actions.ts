'use server'

import * as changeCase from 'change-case'
import { fileTypeFromBlob } from 'file-type'
import { z } from 'zod'

import { env } from '@/config/env'
import { getAuthToken } from '@/lib/auth/token'

import { getAuthenticatedUser } from '../../auth/loaders'
import { ProfileFormState } from './_components/profile-form'

async function uploadUserProfileImage(blob: Blob, userId: number) {
  const token = getAuthToken()
  const fileName = `profile_image_${userId}`
  const fileType = await fileTypeFromBlob(blob)
  const fileExt = fileType?.ext
  const fileOriginalName = fileName + '.' + fileExt

  const newForm = new FormData()
  newForm.append('file', blob, fileOriginalName)
  newForm.append('provider', 'cloudinary')
  newForm.append('name', fileName)

  const res = await fetch(`${env.SERVER_URL}/api/v1/uploads/file`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'post',
    body: newForm,
  })

  if (!res.ok) {
    console.log(`image ${fileName} not uploaded: ${res.status}`)
  }

  const resBody = await res.json()
  return resBody.data
}

const updateUserSchema = z.object({
  // email: z.string({
  //   invalid_type_error: 'Invalid Email',
  // }),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  biography: z.string().nullable(),
  profileImage: z.number().gte(1).optional(),
})

interface RawFormData {
  biography: FormDataEntryValue | null
  firstName: FormDataEntryValue | null
  lastName: FormDataEntryValue | null
  profileImage?: number
}

export async function updateUser(
  additionalFormData: FormData,
  prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const token = getAuthToken()
  const user = await getAuthenticatedUser()

  if (!user) {
    return { result: 'failure' }
  }

  const profileImage = additionalFormData.get('profileImage') as Blob

  const rawFormData: RawFormData = {
    biography: formData.get('biography'),
    firstName: formData.get('first-name'),
    lastName: formData.get('last-name'),
  }

  if (profileImage) {
    const newImage = await uploadUserProfileImage(profileImage, user.id)
    rawFormData.profileImage = newImage.id
  }

  const validatedFields = updateUserSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // eslint-disable-next-line
  const updateUserDto: Record<string, any> = {}

  for (const [key, value] of Object.entries(rawFormData)) {
    if (value !== undefined && value !== null && value !== '') {
      const snakeCaseKey = changeCase.snakeCase(key)
      updateUserDto[snakeCaseKey] = value
    }
  }

  const res = await fetch(`${env.SERVER_URL}/api/v1/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(updateUserDto),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    return { result: 'failure' }
  }

  return { result: 'success' }
}
