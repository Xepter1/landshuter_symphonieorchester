import Link from 'next/link'

const navItems = [
  { href: '/', label: 'Start' },
  { href: '/konzerte', label: 'Konzerte' },
  { href: '/seite/ueber-uns', label: 'Über uns' },
  { href: '/mitwirkende', label: 'Mitwirkende' },
  { href: '/news', label: 'Neuigkeiten' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function SiteHeader({ name }: { name: string }) {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand">
          <small>Landshut</small>
          {name}
        </Link>

        {/* CSS-only Mobile-Menü (kein JavaScript nötig) */}
        <input type="checkbox" id="nav-check" hidden />
        <label className="nav-toggle" htmlFor="nav-check" aria-label="Menü öffnen">
          ☰
        </label>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
