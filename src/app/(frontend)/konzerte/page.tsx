import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/RichText'
import { formatTime, mediaUrl } from '@/lib/format'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Konzerte & Termine' }

function EventRow({ ev, past = false }: { ev: any; past?: boolean }) {
  const d = new Date(ev.date)
  const day = d.toLocaleDateString('de-DE', { day: '2-digit' })
  const mon = d.toLocaleDateString('de-DE', { month: 'short' }).replace('.', '')
  const yr = d.toLocaleDateString('de-DE', { year: 'numeric' })
  const flyerUrl = mediaUrl(ev.flyer)
  const flyerIsPdf = typeof ev.flyer === 'object' && ev.flyer?.mimeType === 'application/pdf'

  return (
    <article className="event">
      <div className="event__date">
        <div className="event__day">{day}</div>
        <div className="event__mon">{mon}</div>
        <div className="event__yr">{yr}</div>
      </div>
      <div>
        <h3 className="event__title">{ev.title}</h3>
        <p className="card__meta">
          {!past && <>{formatTime(ev.date)}</>}
          {ev.location && <> · {ev.location}</>}
        </p>
        {ev.description && <RichText data={ev.description} className="prose" />}
        <div className="event__tags">
          {Array.isArray(ev.performers) &&
            ev.performers
              .filter((p: any) => typeof p === 'object')
              .map((p: any) => (
                <span className="tag" key={p.id}>
                  {p.role ? `${p.role}: ` : ''}{p.name}
                </span>
              ))}
          {flyerUrl && (
            <span className="tag">
              <a className="flyer-link" href={flyerUrl} target="_blank" rel="noopener noreferrer">
                {flyerIsPdf ? '📄 Flyer (PDF)' : '🖼️ Flyer'}
              </a>
            </span>
          )}
          {ev.ticketUrl && (
            <span className="tag">
              <a href={ev.ticketUrl} target="_blank" rel="noopener noreferrer">🎟️ Tickets</a>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default async function KonzertePage() {
  const payload = await getPayloadClient()
  const nowIso = new Date().toISOString()

  const [upcoming, past] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { and: [{ published: { equals: true } }, { date: { greater_than_equal: nowIso } }] },
      sort: 'date',
      limit: 100,
      depth: 1,
    }),
    payload.find({
      collection: 'events',
      where: { and: [{ published: { equals: true } }, { date: { less_than: nowIso } }] },
      sort: '-date',
      limit: 50,
      depth: 1,
    }),
  ])

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Spielplan</p>
        <h1>Konzerte &amp; Termine</h1>

        <div style={{ marginTop: '2rem' }}>
          {upcoming.docs.length === 0 ? (
            <div className="notice">Derzeit sind keine kommenden Termine veröffentlicht.</div>
          ) : (
            upcoming.docs.map((ev: any) => <EventRow key={ev.id} ev={ev} />)
          )}
        </div>

        {/* Archiv vergangener Konzerte */}
        {past.docs.length > 0 && (
          <div style={{ marginTop: '3.5rem' }}>
            <h2>Archiv</h2>
            <p className="muted">Vergangene Konzerte und Projekte.</p>
            <div style={{ marginTop: '1rem' }}>
              {past.docs.map((ev: any) => <EventRow key={ev.id} ev={ev} past />)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
