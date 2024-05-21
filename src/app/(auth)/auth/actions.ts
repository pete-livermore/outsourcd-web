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

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
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
    return { result: 'failure' }
  }

  const resData = await res.json()

  if (!resData.token) {
    redirect('/error/500')
  }

  cookies().set({
    name: env.AUTH_COOKIE_NAME,
    value: resData.token,
    httpOnly: true,
    path: '/',
  })

  return { result: 'success' }
}

export async function logout() {
  cookies().delete(env.AUTH_COOKIE_NAME)

  return redirect('/auth/login')
}
