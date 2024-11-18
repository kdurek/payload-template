import { getCachedGlobal } from '@/utils/get-globals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/link'
import { socialIcons } from '@/components/social-icons'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []
  const socialItems = footer?.socialItems || []

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-6">
        <div className="grid place-items-center gap-6 lg:grid-cols-3">
          <Link href="/" className="lg:justify-self-start">
            <picture>
              <img
                alt="CHANGE_ME"
                className="max-w-36"
                src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/payload/src/admin/assets/images/payload-logo-light.svg"
              />
            </picture>
          </Link>

          <nav className="flex items-center gap-12 lg:justify-self-center">
            {navItems.map(({ id, link }) => {
              return (
                <CMSLink
                  key={id}
                  className="text-lg font-semibold leading-relaxed text-background"
                  {...link}
                  appearance="link"
                />
              )
            })}
          </nav>

          <div className="flex items-center gap-6 lg:justify-self-end">
            {socialItems.map(({ type, url }) => (
              <a
                key={type}
                href={url}
                aria-label={type}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background lg:text-background"
              >
                {socialIcons[type]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="https://hookycode.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-background/70 hover:text-background"
          >
            Crafted by Hooky Code
          </a>
        </div>
      </div>
    </footer>
  )
}
