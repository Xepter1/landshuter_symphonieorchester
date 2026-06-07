import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/RichText'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Kontakt' }

export default async function KontaktPage() {
  const payload = await getPayloadClient()
  const s = await payload.findGlobal({ slug: 'settings' })

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Kontakt</p>
        <h1>Schreiben Sie uns</h1>

        <div className="contact-grid" style={{ marginTop: '2rem' }}>
          <div>
            {s?.email && (
              <div className="contact-item">
                <div className="label">E-Mail</div>
                <a href={`mailto:${s.email}`}>{s.email}</a>
              </div>
            )}
            {s?.phone && (
              <div className="contact-item">
                <div className="label">Telefon</div>
                <a href={`tel:${s.phone.replace(/\s/g, '')}`}>{s.phone}</a>
              </div>
            )}
            {s?.address && (
              <div className="contact-item">
                <div className="label">Anschrift</div>
                <p style={{ whiteSpace: 'pre-line' }}>{s.address}</p>
              </div>
            )}
            {s?.social && s.social.length > 0 && (
              <div className="contact-item">
                <div className="label">Social Media</div>
                {s.social.map((soc: any, i: number) =>
                  soc.url ? (
                    <p key={i} style={{ margin: 0 }}>
                      <a href={soc.url} target="_blank" rel="noopener noreferrer">{soc.platform || soc.url}</a>
                    </p>
                  ) : null,
                )}
              </div>
            )}
          </div>
          <div>
            {s?.contactNote ? (
              <RichText data={s.contactNote} />
            ) : (
              <p className="muted">
                Wir freuen uns über Ihre Nachricht – ob zu Konzerten, zur Mitwirkung im Orchester
                oder zu Kooperationen.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
