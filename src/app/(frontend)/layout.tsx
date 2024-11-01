import type { Metadata } from 'next'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { cn } from '@/utils/cn'

import { AdminBar } from '@/components/admin-bar'
import { env } from '@/env'
import { Footer } from '@/footer/component'
import { Header } from '@/header/component'
import { mergeOpenGraph } from '@/utils/merge-open-graph'

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <AdminBar />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(env.BASE_URL),
  openGraph: mergeOpenGraph(),
}
