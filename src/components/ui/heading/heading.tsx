import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

import { cn } from '@/utils/styles'

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const headingVariants = cva([], {
  variants: {
    variant: {
      h1: 'my-7 text-4xl font-bold sm:mb-4 md:mt-4',
      h2: 'my-6 text-2xl font-semibold sm:mb-3 md:mt-3',
      h3: 'my-7 text-xl sm:mb-3 md:mt-3',
      h4: 'my-7 text-lg sm:mb-3 md:mt-3',
    },
    textColor: {
      primary: 'text-primary',
      grey: 'text-gray-600',
    },
    justification: {
      center: 'text-center',
      left: 'text-left',
    },
  },
  defaultVariants: {
    variant: 'h1',
    textColor: 'primary',
    justification: 'center',
  },
})

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, justification, variant = 'h1', textColor, children, ...props },
    ref,
  ) => {
    const classes = cn(
      headingVariants({ variant, textColor, justification, className }),
    )

    switch (variant) {
      case 'h1': {
        return (
          <h1 className={classes} {...props} ref={ref}>
            {children}
          </h1>
        )
      }
      case 'h2': {
        return (
          <h2 className={classes} {...props} ref={ref}>
            {children}
          </h2>
        )
      }
      case 'h3': {
        return (
          <h3 className={classes} {...props} ref={ref}>
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
