'use client'

import { CldImage } from 'next-cloudinary'

export function CompanyInfo({ name }: { name: string }) {
  return (
    <div className='flex items-center'>
      <CldImage src='pc3ln9fb8myr9t5b5apw' alt={name} width={80} height={80} />
      <p className='text-lg font-semibold'>{name}</p>
    </div>
  )
}
