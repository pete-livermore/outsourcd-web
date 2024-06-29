import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { prisma } from '@/db/client'
import { PageSection } from '@/types/entities/page-section'
import { logger } from '@/utils/logging/logger'
import { cn } from '@/utils/styles'

import { CompanyLogoCarousel } from './_components/company-logo-carousel'

interface HeroSectionProps {
  data: Omit<PageSection, 'name'>
}

export function HeroSection({ data }: HeroSectionProps) {
  const { content } = data
  const videoContent = content.find((cont) => cont.type === 'video')
  return (
    <section>
      <div className='relative h-screen w-full' data-testid='homepage-hero'>
        {videoContent?.url && (
          <video
            src={videoContent.url}
            className='size-full object-cover brightness-[40%]'
            autoPlay
            muted
            loop
          />
        )}
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

interface Sections {
  [key: string]: Omit<PageSection, 'name'>
}

export default async function HomePage() {
  const pageData = await prisma.page.findUnique({
    where: { slug: '/' },
    include: { sections: { include: { content: true } } },
  })

  if (!pageData) {
    logger.error('error retrieving homepage data from DB')
    throw new Error()
  }

  const sections = pageData.sections.reduce((acc: Sections, sec) => {
    const { name, ...rest } = sec
    acc[name] = rest
    return acc
  }, {})

  return (
    <div>
      {sections.hero && <HeroSection data={sections.hero} />}
      <section className='bg-muted'>
        <div className='py-6'>
          <CompanyLogoCarousel />
        </div>
      </section>
    </div>
  )
}
