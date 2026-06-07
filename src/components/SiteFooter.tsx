import Link from 'next/link'

type FooterProps = {
  name: string
  email?: string | null
  phone?: string | null
  address?: string | null
  social?: { platform?: string | null; url?: string | null }[] | null
}

export function SiteFooter({ name, email, phone, address, social }: FooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{name}</h4>
            {address && <p style={{ whiteSpace: 'pre-line', color: '#bcaea0' }}>{address}</p>}
            {social && social.length > 0 && (
              <p>
                {social.map((s, i) =>
                  s.url ? (
                    <span key={i}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.platform || s.url}
                      </a>
                      {i < social.length - 1 ? ' · ' : ''}
                    </span>
                  ) : null,
                )}
              </p>
            )}
          </div>

          <div>
            <h4>Navigation</h4>
            <ul className="footer-nav">
              <li><Link href="/konzerte">Konzerte</Link></li>
              <li><Link href="/seite/ueber-uns">Über uns</Link></li>
              <li><Link href="/mitwirkende">Mitwirkende</Link></li>
              <li><Link href="/galerie">Galerie</Link></li>
              <li><Link href="/news">Neuigkeiten</Link></li>
            </ul>
          </div>

          <div>
            <h4>Kontakt</h4>
            <ul className="footer-nav">
              {email && <li><a href={`mailto:${email}`}>{email}</a></li>}
              {phone && <li><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>}
              <li><Link href="/kontakt">Kontaktseite</Link></li>
              <li><Link href="/impressum">Impressum</Link></li>
              <li><Link href="/datenschutz">Datenschutz</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {name}</span>
          <span>
            <Link href="/impressum">Impressum</Link>
            {' · '}
            <Link href="/datenschutz">Datenschutz</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
