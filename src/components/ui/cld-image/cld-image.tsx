'use client'
import { CldImage as BaseCldImage, CldImageProps } from 'next-cloudinary'
import React from 'react'

import { CLOUDINARY_FOLDER_NAME } from '@/constants/cloudinary'

export const CldImage = React.forwardRef<HTMLImageElement, CldImageProps>(
  ({ src, ...props }, ref) => {
    const source = `${CLOUDINARY_FOLDER_NAME}/${src}`
    return <BaseCldImage src={source} ref={ref} {...props} />
  },
)

CldImage.displayName = 'CldImage'
