'use client'
import { CldImage as BaseCldImage, CldImageProps } from 'next-cloudinary'

const CLOUDINARY_FOLDER_NAME = 'outsourcd'

export default function CldImage({ src, ...props }: CldImageProps) {
  const source = `${CLOUDINARY_FOLDER_NAME}/${src}`
  return <BaseCldImage src={source} {...props} />
}
