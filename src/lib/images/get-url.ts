import { env } from '@/config/env'

import { cloudinary } from './cloudinary'

export function getImgUrl(publicId: string) {
  return cloudinary.url(env.CLOUDINARY_FOLDER_NAME + '/' + publicId)
}
