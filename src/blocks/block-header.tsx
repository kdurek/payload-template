import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

interface BlockHeaderProps {
  title: string
  className?: string
}

export const BlockHeader = forwardRef<HTMLDivElement, BlockHeaderProps>(function BlockHeader(
  { className, title, ...props },
  ref,
) {
  return (
    <h1 ref={ref} className={cn('text-2xl font-bold lg:text-3xl', className)} {...props}>
      {title}
    </h1>
  )
})
