'use server'

import * as changeCase from 'change-case'
import { fileTypeFromBlob } from 'file-type'
import { z } from 'zod'

import { env } from '@/config/env'
import { getAuthToken } from '@/lib/auth/token'
import { userService } from '@/services/user'
import { UpdateUserDto } from '@/services/user/user-service'
import { logger } from '@/utils/logging/logger'

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
    logger.error(
      `image ${fileName} not uploaded (received status ${res.status})`,
    )
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
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const result = await userService.getAuthenticatedUser()

  if (result.type === 'failure') {
    return { result: 'failure' }
  }

  const user = result.data

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

  const updateResult = await userService.update(
    user.id,
    updateUserDto as UpdateUserDto,
  )

  if (updateResult.type === 'failure') {
    const failureReason =
      updateResult.reason === 'auth-error' ? 'authentication' : 'server'
    logger.error(`user ${user.id} not updated due to ${failureReason} error`)
    return { result: 'failure' }
  }

  return { result: 'success' }
}
