'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { env } from '@/config/env'
import { authService } from '@/services/auth'

import { LoginFormState } from './login/_components/login-form'

const loginSchema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
  password: z.string().min(1),
})

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const validatedFields = loginSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      result: 'failure',
      reason: 'validation-error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const result = await authService.login(validatedFields.data)

  if (result.type === 'failure') {
    return {
      result: 'failure',
      reason: result.reason,
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

  return { result: 'success' }
}

export async function logout() {
  cookies().delete(env.AUTH_COOKIE_NAME)
  cookies().delete('user')

  return redirect('/auth/login')
}
