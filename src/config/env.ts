import { z } from 'zod'

const envSchema = z.object({
  AUTH_COOKIE_NAME: z.string(),
  DOMAIN: z.string(),
  USER_ADMIN_URL: z.string().url(),
})

export const env = envSchema.parse({
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME || 'dev-auth-token',
  DOMAIN: process.env.DOMAIN || 'localhost',
  USER_ADMIN_URL: process.env.USER_ADMIN_URL,
})
