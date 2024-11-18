'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink, type CMSLinkType } from '@/components/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { socialIcons } from '@/components/social-icons'

const NavItem: React.FC<CMSLinkType> = (link) => {
  return (
    <CMSLink
      className="text-lg font-semibold leading-relaxed text-foreground"
      {...link}
      appearance="link"
    />
  )
}

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = header?.navItems || []
  const socialItems = header?.socialItems || []

  return (
    <nav className="flex items-center gap-6">
      <div className="flex lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Menu onClick={() => setIsOpen(true)} />
            <span className="sr-only">Menu Icon</span>
          </SheetTrigger>
          <SheetContent side="top">
            <nav className="flex flex-col items-center justify-center gap-2">
              {navItems.map(({ id, link }) => (
                <NavItem key={id} onClick={() => setIsOpen(false)} {...link} />
              ))}
              {socialItems.map(({ type, url }) => (
                <a
                  key={type}
                  href={url}
                  aria-label={type}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground lg:text-foreground"
                >
                  {socialIcons[type]}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden items-center justify-start gap-6 lg:inline-flex">
        {navItems.map(({ id, link }) => {
          return <NavItem key={id} {...link} />
        })}
        {socialItems.map(({ type, url }) => (
          <a
            key={type}
            href={url}
            aria-label={type}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground lg:text-foreground"
          >
            {socialIcons[type]}
          </a>
        ))}
      </div>
    </nav>
  )
}
