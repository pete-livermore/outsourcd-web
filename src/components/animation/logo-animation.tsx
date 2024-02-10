'use client'
import Lottie from 'lottie-react'

import { cn } from '@/utils/styles'

import lottieJson from 'public/assets/animations/managers-to-coaches.json'

interface ILogoAnimationProps {
  className?: string
}

export function LogoAnimation({ className }: ILogoAnimationProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-primary py-4',
        className,
      )}
    >
      <Lottie
        loop
        animationData={lottieJson}
        style={{ width: '65%', height: '65%' }}
      />
    </div>
  )
}
