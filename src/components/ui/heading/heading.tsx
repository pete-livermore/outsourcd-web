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
      xxl: 'my-8 text-6xl font-bold sm:mb-4 md:mt-4',
      xl: 'my-2 text-4xl font-bold sm:mb-4 md:mt-4',
      lg: 'my-6 text-2xl font-semibold sm:mb-3 md:mt-3',
      md: 'my-7 text-xl sm:mb-3 md:mt-3',
      sm: 'my-7 text-lg sm:mb-3 md:mt-3',
    },
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
      children,
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
        return (
          <h1 {...elementProps} ref={ref}>
            {children}
          </h1>
        )
      }
      case 2: {
        return (
          <h2 {...elementProps} ref={ref}>
            {children}
          </h2>
        )
      }
      case 3: {
        return (
          <h3 {...elementProps} ref={ref}>
            {children}
          </h3>
        )
      }
      default:
        return null
    }
  },
)

Heading.displayName = 'Heading'
