import { ArrowRight, Hammer } from 'lucide-react'
import Link from 'next/link'

import { Heading } from '@/components/ui/heading'

export default function NotFoundPage() {
  return (
    <div className='flex h-screen w-full items-center justify-center px-4'>
      <div className='flex flex-col justify-center space-y-3'>
        <div>
          <Heading as='h1' size='xl'>
            <Hammer className='mr-2 inline' size={48} />
            This page is under construction
          </Heading>
          <p className='text-xl'>Please check back later</p>
        </div>
        <div className='flex justify-end'>
          <Link href='/' className='text-lg text-primary underline'>
            Go home <ArrowRight className='inline' size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}
