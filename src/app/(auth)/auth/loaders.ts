'use server'

import { env } from '@/config/env'
import { getAuthToken } from '@/lib/auth/token'

interface AuthUserData {
  id: number
  email: string
  firstName: string
  lastName: string
  role: {
    id: number
    name: string
  }
  createdAt: string
  updatedAt: string
}

export async function getAuthenticatedUser(): Promise<AuthUserData | null> {
  const token = getAuthToken()

  if (!token) {
    return null
  }
  const res = await fetch(`${env.SERVER_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.status === 401) {
    return null
  }

  const resData = await res.json()
  return resData.data
}
