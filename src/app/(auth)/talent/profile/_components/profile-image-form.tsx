import Image from 'next/image'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ProfileImageForm() {
  return (
    <div className='flex w-full justify-center'>
      <div>
        <div>
          <Image
            src='/assets/images/test.jpg'
            alt='test'
            width={300}
            height={300}
          />
        </div>
        <div className='mt-2'>
          <Label htmlFor='picture'>Select a new image</Label>
          <Input id='picture' type='file' className='cursor-pointer' />
        </div>
      </div>
    </div>
  )
}
