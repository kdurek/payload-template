import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-[120px] font-extrabold text-muted-foreground">404</h1>
        <p className="mb-6 text-2xl font-medium text-muted-foreground">
          Strona nie została znaleziona
        </p>
        <Link className={cn(buttonVariants())} href="/">
          Powrót do strony głównej
        </Link>
      </div>
    </div>
  )
}
