'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navItems = [
  { href: '/', label: 'Start' },
  { href: '/konzerte', label: 'Konzerte' },
  { href: '/seite/ueber-uns', label: 'Über uns' },
  { href: '/mitwirkende', label: 'Mitwirkende' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/news', label: 'Neuigkeiten' },
  { href: '/kontakt', label: 'Kontakt' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function SiteHeader({ name, logoUrl }: { name: string; logoUrl?: string | null }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const touchStartX = useRef<number | null>(null)

  // Nach Seitenwechsel automatisch schließen
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // ESC schließt; Hintergrund-Scroll sperren, solange offen
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // Wisch-nach-rechts zum Schließen
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 55) setOpen(false)
    touchStartX.current = null
  }

  return (
    <>
      <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand">
          {logoUrl ? (
            <img className="brand__logo" src={logoUrl} alt={name} />
          ) : (
            <>
              <small>Landshut</small>
              {name}
            </>
          )}
        </Link>

        {/* Desktop-Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: Menü öffnen */}
        <button
          className="nav-toggle"
          aria-label="Menü öffnen"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      </header>

      {/* Scrim (abdunkelnder Hintergrund) */}
      <div
        className={`drawer-scrim${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile-Drawer */}
      <nav
        id="mobile-drawer"
        className={`drawer${open ? ' is-open' : ''}`}
        aria-label="Hauptmenü"
        aria-hidden={!open}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="drawer__head">
          <span className="drawer__title">Menü</span>
          <button className="drawer__close" aria-label="Menü schließen" onClick={() => setOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <ul className="drawer__links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
