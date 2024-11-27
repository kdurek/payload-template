import { forwardRef, type HTMLAttributes } from 'react'

import { InView } from '@/components/ui/in-view'
import { cn } from '@/utils/cn'

interface BlockWrapperProps extends HTMLAttributes<HTMLDivElement> {
  invertBackground?: boolean | null
  animateBackground?: boolean | null
  animate?: boolean | null
  animateFrom?: ('top' | 'right' | 'bottom' | 'left') | null
}

export const BlockWrapper = forwardRef<HTMLDivElement, BlockWrapperProps>(function BlockWrapper(
  { children, className, invertBackground, animateBackground, animate, animateFrom, ...props },
  ref,
) {
  const wrapperClassName = cn('container relative py-12 lg:py-24', className)
  const wrapperAnimateFrom = {
    top: { x: 0, y: -100 },
    right: { x: 100, y: 0 },
    bottom: { x: 0, y: 100 },
    left: { x: -100, y: 0 },
  }

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div
        className={cn({
          'absolute inset-0 bg-muted blur-2xl': invertBackground,
        })}
      />
      {animate ? (
        <InView
          variants={{
            hidden: {
              opacity: 0,
              filter: 'blur(4px)',
              ...wrapperAnimateFrom[animateFrom ?? 'bottom'],
            },
            visible: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' },
          }}
          viewOptions={{ once: true, margin: '0px 0px -100px 0px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className={wrapperClassName} {...props}>
            {children}
          </div>
        </InView>
      ) : (
        <div className={wrapperClassName} {...props}>
          {children}
        </div>
      )}
    </section>
  )
})
