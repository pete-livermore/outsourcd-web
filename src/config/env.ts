import { z } from 'zod'

const envSchema = z.object({
  AUTH_COOKIE_NAME: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_FOLDER_NAME: z.string(),
  DOMAIN: z.string(),
  LOG_LEVEL: z.string().optional(),
  SERVER_URL: z.string().url(),
})

export const env = envSchema.parse({
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME || '_auth',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER_NAME: process.env.CLOUDINARY_FOLDER_NAME,
  DOMAIN: process.env.DOMAIN || 'localhost',
  LOG_LEVEL: process.env.LOG_LEVEL,
  SERVER_URL: process.env.SERVER_URL,
})
