import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { buildCloudinaryUrl } from '@/lib/images/cloudinary'
import { cn } from '@/utils/styles'

import { CompanyLogoCarousel } from './_components/company-logo-carousel'

const HERO_VIDEO_PATH = 'freelance_worker_video.mp4'

export function HeroSection() {
  return (
    <section className=''>
      <div className='relative h-screen w-full' data-testid='homepage-hero'>
        <video
          src={buildCloudinaryUrl(HERO_VIDEO_PATH, { media: 'video' })}
          className='size-full object-cover brightness-[40%]'
          autoPlay
          muted
          loop
        />
        <div className='absolute inset-1/2 flex h-fit min-w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-8 xl:items-start'>
          <Heading
            as='h1'
            textColor='white'
            size='xxl'
            className='animate-fade-in text-center xl:text-left'
          >
            Find a job that works for{' '}
            <span className='relative'>
              you
              <span className='absolute -bottom-2 left-0 h-1.5 animate-expand-width bg-destructive'></span>
            </span>
          </Heading>
          <p className='text-xl text-foreground'>Discover. Apply. Succeed.</p>
          <Link
            href='/talent'
            className={cn(
              buttonVariants({ variant: 'default' }),
              'font-semibold',
            )}
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <section className='bg-muted'>
        <div className='py-6'>
          <CompanyLogoCarousel />
        </div>
      </section>
    </div>
  )
}
