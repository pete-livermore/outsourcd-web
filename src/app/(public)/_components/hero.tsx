import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { getImgUrl } from '@/lib/images/get-url'

const HERO_IMAGE_PUBLIC_ID = 'coffee-desktop_axim86'
const HERO_IMAGE_ALT_TEXT = 'working in a coffee shop'

export function Hero() {
  const imageUrl = getImgUrl(HERO_IMAGE_PUBLIC_ID)
  return (
    <div className='relative h-[500px] w-full'>
      <Image
        src={imageUrl}
        alt={HERO_IMAGE_ALT_TEXT}
        fill
        style={{ objectFit: 'cover' }}
        className='brightness-[35%]'
      />
      <div className='absolute inset-1/2 h-fit min-w-[600px] -translate-x-1/2 -translate-y-1/2 space-y-8'>
        <Heading
          level={1}
          justification='left'
          textColor='white'
          size='xxl'
          className='[text-shadow:_0_1px_0_hsl(var(--muted-foreground))]'
        >
          Find a job that works for you
        </Heading>
        <Link href='/talent' className={buttonVariants({ variant: 'default' })}>
          Get started
        </Link>
      </div>
    </div>
  )
}
