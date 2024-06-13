import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/utils/styles'

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level: 1 | 2 | 3 | 4
}

const headingVariants = cva([], {
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
    justification: {
      center: 'text-center',
      left: 'text-left',
    },
  },
  defaultVariants: {
    size: 'lg',
    weight: 'bold',
    textColor: 'primary',
    justification: 'center',
  },
})

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      justification,
      level = 'h1',
      size = 'lg',
      textColor,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      headingVariants({ size, textColor, justification, className }),
    )

    const elementProps = { className: classes, ...props }

    switch (level) {
      case 1: {
        return <h1 ref={ref} {...elementProps}></h1>
      }
      case 2: {
        return <h2 ref={ref} {...elementProps}></h2>
      }
      case 3: {
        return <h3 ref={ref} {...elementProps}></h3>
      }
      default:
        return null
    }
  },
)

Heading.displayName = 'Heading'
