'use client'

import { ZoomIn, ZoomOut } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { generateCroppedImage, ImageCrop } from '@/lib/images/crop'

interface EditProfileImageProps {
  currentImage: string | undefined
  onEditComplete: (blob: Blob) => void | Promise<void>
}

export function EditProfileImage({
  onEditComplete,
  currentImage,
}: EditProfileImageProps) {
  const [uncroppedImage, setUncroppedImage] = useState<
    File & { preview: string }
  >()
  const [croppedImage, setCroppedImage] = useState<Blob | undefined>()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files

    if (files) {
      const file = files[0]
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
      setUncroppedImage(newFile)
    }
  }

  async function handleCropComplete(
    _croppedArea: ImageCrop,
    croppedAreaPixels: ImageCrop,
  ) {
    if (uncroppedImage?.preview) {
      const croppedImageBlob = await generateCroppedImage(
        uncroppedImage.preview,
        croppedAreaPixels,
      )
      if (croppedImageBlob) {
        setCroppedImage(croppedImageBlob)
      }
    }
  }

  function handleCloseModal(isOpen: boolean) {
    if (!isOpen) {
      setUncroppedImage(undefined)
    }
  }

  async function handleImageEditComplete() {
    if (croppedImage) {
      onEditComplete(croppedImage)
      setUncroppedImage(undefined)
    }
  }

  const imageSrc = croppedImage
    ? URL.createObjectURL(croppedImage)
    : currentImage ?? '/assets/images/profile-placeholder.png'

  const imageAlt = croppedImage
    ? 'new image'
    : currentImage
      ? 'profile image'
      : 'profile placeholder'

  return (
    <Dialog open={!!uncroppedImage} onOpenChange={handleCloseModal}>
      <DialogContent>
        <div className='h-[680px]'>
          <div className='absolute inset-0 bottom-[160px] top-12'>
            <Cropper
              image={uncroppedImage?.preview}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className='absolute inset-x-0 bottom-[80px] flex h-[80px] justify-center'>
            <div className='flex w-60 items-center gap-x-6'>
              <div>
                <ZoomOut />
              </div>
              <Slider
                className='cursor-pointer'
                step={0.1}
                min={1}
                max={3}
                onValueChange={(value) => setZoom(value[0])}
              />
              <div>
                <ZoomIn />
              </div>
            </div>
          </div>
          <div className='absolute inset-x-0 bottom-0 flex h-[80px] justify-center'>
            <Button onClick={handleImageEditComplete}>Confirm edit</Button>
          </div>
        </div>
      </DialogContent>
      <div className='flex w-full justify-center'>
        <div>
          <div className='relative h-72 w-full'>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className='mt-2'>
            <Label htmlFor='picture'>Select a new image</Label>
            <Input
              id='picture'
              type='file'
              className='cursor-pointer'
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}
