'use client' // Error components must be Client Components

import OutsourcdLogo from 'public/assets/svg/outsourcd-logo.svg'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center space-y-6'>
      <OutsourcdLogo height={100} width={600} />
      <Heading as='h2' textColor='grey' size='md'>
        Sorry, something went wrong...
      </Heading>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
