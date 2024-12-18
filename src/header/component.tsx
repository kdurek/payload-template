import { getCachedGlobal } from '@/utils/get-globals'
import React from 'react'

import type { Header } from '@/payload-types'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { HeaderNav } from '@/header/nav'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()

  return (
    <header className="container relative z-20 flex h-16 items-center justify-between">
      <Link href="/">
        <Logo loading="eager" priority="high" />
      </Link>
      <HeaderNav header={header} />
    </header>
  )
}
