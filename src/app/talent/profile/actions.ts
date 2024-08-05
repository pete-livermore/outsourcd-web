'use server'

import { fileTypeFromBlob } from 'file-type'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { VALIDATION_ERROR_MESSAGE } from '@/constants/errors/messages/validation-error-message'
import { ApiClient } from '@/lib/api/client/api-client'
import { getAuthToken } from '@/lib/auth/token'
import { authRedirect } from '@/lib/navigation/redirect'
import { MediaService } from '@/services/media/media-service'
import { UsersService } from '@/services/users/users-service'

import { ProfileFormState } from './_components/profile-form'

const SERVER_ERROR_MESSAGE = 'Sorry, there was a server error'

const updateUserSchema = z.object({
  // email: z.string({
  //   invalid_type_error: 'Invalid Email',
  // }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  biography: z.string().optional(),
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
  _prevState: ProfileFormState | null,
  formData: FormData,
): Promise<ProfileFormState> {
  const token = getAuthToken()

  if (!token) {
    return authRedirect()
  }

  const apiClient = new ApiClient(token)
  const usersService = new UsersService(apiClient)
  const getUserResult = await usersService.getAuthenticatedUser()

  if (getUserResult.type === 'failure') {
    return authRedirect()
  }

  const user = getUserResult.data

  const rawFormData: RawFormData = {
    biography: formData.get('biography'),
    firstName: formData.get('firstname'),
    lastName: formData.get('lastname'),
  }

  const profileImage = additionalFormData.get('profileImage') as Blob

  if (profileImage) {
    const fileName = `profile_image_${user.id}`
    const fileType = await fileTypeFromBlob(profileImage)

    if (!fileType) {
      return {
        type: 'failure',
        message: VALIDATION_ERROR_MESSAGE,
        errors: { profileImage: ['Profile image must be a valid file type'] },
      }
    }

    const mediaService = new MediaService(apiClient)
    const uploadResult = await mediaService.upload(profileImage, {
      ext: fileType.ext,
      name: fileName,
    })

    if (uploadResult.type === 'failure') {
      if (uploadResult.reason === 'auth-error') {
        redirect('/auth/login')
      }
      return { type: 'failure', message: SERVER_ERROR_MESSAGE }
    }

    rawFormData.profileImage = uploadResult.data.id
  }

  const validatedFields = updateUserSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      type: 'failure',
      message: VALIDATION_ERROR_MESSAGE,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const updateResult = await usersService.update(user.id, validatedFields.data)

  if (updateResult.type === 'failure') {
    if (updateResult.reason === 'auth-error') {
      redirect('/auth/login')
    }
    return { type: 'failure', message: SERVER_ERROR_MESSAGE }
  }

  return { type: 'success', message: 'User updated succesfully' }
}
