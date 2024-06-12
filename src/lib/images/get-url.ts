import { cloudinary } from './cloudinary'

const FOLDER_NAME = 'outsourcd'

export function getImgUrl(publicId: string) {
  return cloudinary.url(FOLDER_NAME + '/' + publicId)
}
