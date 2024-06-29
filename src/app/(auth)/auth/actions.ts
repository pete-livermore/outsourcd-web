'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { env } from '@/config/env'

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
      failureReason: 'validation-error',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const res = await fetch(`${env.SERVER_URL}/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(validatedFields.data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    if (res.status === 401) {
      return {
        result: 'failure',
        failureReason: 'auth-error',
      }
    }
    return {
      result: 'failure',
      failureReason: 'server-error',
    }
  }

  const resBody = await res.json()

  const authCookie = {
    name: env.AUTH_COOKIE_NAME,
    value: resBody.token,
    httpOnly: true,
    path: '/',
  }

  cookies().set(authCookie)

  const userCookie = {
    name: 'user',
    value: resBody.user.id,
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
