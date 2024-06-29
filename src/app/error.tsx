'use client' // Error components must be Client Components

import OutsourcdLogo from 'public/assets/svg/outsourcd-logo.svg'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
