import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/utils/styles'

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as: 'h1' | 'h2' | 'h3' | 'h4'
}

const headingVariants = cva(['text-center'], {
  variants: {
    size: {
      xxl: 'my-8 text-6xl sm:mb-4 md:mt-4',
      xl: 'my-2 text-5xl sm:mb-4 md:mt-4',
      lg: 'my-6 text-4xl sm:mb-3 md:mt-3',
      md: 'my-7 text-3xl sm:mb-3 md:mt-3',
      sm: 'my-7 text-2xl sm:mb-3 md:mt-3',
    },
    weight: { bold: 'font-bold', semibold: 'font-semibold' },
    textColor: {
      primary: 'text-primary',
      grey: 'text-gray-600',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'lg',
    weight: 'bold',
    textColor: 'primary',
  },
})

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = 'h1', size, weight, textColor, ...props }, ref) => {
    const Element = as
    return (
      <Element
        className={cn(
          headingVariants({
            size,
            textColor,
            className,
            weight,
          }),
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Heading.displayName = 'Heading'
