import Image from 'next/image'
import Link from 'next/link'
import { getPlaiceholder } from 'plaiceholder'

import { buttonVariants } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'

// const HERO_IMAGE_PUBLIC_ID = 'coffee-desktop_axim86'
const HERO_IMAGE_ALT_TEXT = 'working in a coffee shop'

export async function Hero() {
  const imageUrl =
    'https://res.cloudinary.com/di7ndofao/image/upload/v1718169624/outsourcd/coffee-desktop_axim86.jpg'
  // getImgUrl(HERO_IMAGE_PUBLIC_ID)
  const buffer = await fetch(imageUrl).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  )
  const { base64 } = await getPlaiceholder(buffer)

  return (
    <div className='relative h-[500px] w-full' data-testId='homepage-hero'>
      <Image
        src={imageUrl}
        alt={HERO_IMAGE_ALT_TEXT}
        fill
        style={{ objectFit: 'cover' }}
        className='brightness-[35%]'
        placeholder='blur'
        blurDataURL={base64}
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
