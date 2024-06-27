import { env } from '@/config/env'
import { CLOUDINARY_FOLDER_NAME } from '@/constants/cloudinary'

interface Options {
  media: 'image' | 'video'
}

const BASE_URL = 'https://res.cloudinary.com'

export function buildCloudinaryUrl(path: string, options?: Options) {
  const { media = 'image' } = options || {}
  return `${BASE_URL}/${env.CLOUDINARY_CLOUD_NAME}/${media}/upload/v1719368298/${CLOUDINARY_FOLDER_NAME}/${path}`
}
