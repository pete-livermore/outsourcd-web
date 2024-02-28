import { z } from 'zod'

const envSchema = z.object({
  AUTH_COOKIE_NAME: z.string(),
  DOMAIN: z.string(),
  BACKEND_URL: z.string().url(),
})

export const env = envSchema.parse({
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME || '_auth',
  DOMAIN: process.env.DOMAIN || 'localhost',
  BACKEND_URL: process.env.BACKEND_URL,
})
