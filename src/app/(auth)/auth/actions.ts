'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { env } from '@/config/env'
import { SERVER_ERROR_MESSAGE } from '@/constants/errors/messages/server-error-message'
import { VALIDATION_ERROR_MESSAGE } from '@/constants/errors/messages/validation-error-message'
import { ApiClient } from '@/lib/api/client/api-client'
import { AuthService } from '@/services/auth/auth-service'

import { LoginFormState } from './login/_components/login-form'

const AUTH_ERROR_MESSAGE = 'The provided credentials are invalid'

const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Invalid Email',
    })
    .min(1, 'Email must not be empty'),
  password: z
    .string({
      invalid_type_error: 'Invalid password',
    })
    .min(1, 'Password must not be empty'),
})

export async function login(
  _prevState: LoginFormState | null,
  formData: FormData,
): Promise<LoginFormState> {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const validatedFields = loginSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      type: 'failure',
      message: VALIDATION_ERROR_MESSAGE,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const authService = AuthService.getInstance(ApiClient.getInstance())
  const result = await authService.login(validatedFields.data)

  if (result.type === 'failure') {
    const message =
      result.reason === 'auth-error' ? AUTH_ERROR_MESSAGE : SERVER_ERROR_MESSAGE
    return {
      type: 'failure',
      message,
    }
  }

  const authCookie = {
    name: env.AUTH_COOKIE_NAME,
    value: result.data.token,
    httpOnly: true,
    path: '/',
  }

  cookies().set(authCookie)

  const userCookie = {
    name: 'user',
    value: String(result.data.user),
    path: '/talent',
  }

  cookies().set(userCookie)

  return { type: 'success', message: 'Successfully authenticated' }
}

export async function logout() {
  cookies().delete(env.AUTH_COOKIE_NAME)
  cookies().delete('user')

  return redirect('/auth/login')
}
