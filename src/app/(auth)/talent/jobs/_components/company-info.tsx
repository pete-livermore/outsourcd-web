'use client'

import { CldImage } from 'next-cloudinary'

export function CompanyInfo({ name }: { name: string }) {
  return (
    <div className='flex items-center'>
      <CldImage src='pc3ln9fb8myr9t5b5apw' alt={name} width={60} height={60} />
      <p className='text-base font-semibold'>{name}</p>
    </div>
  )
}
