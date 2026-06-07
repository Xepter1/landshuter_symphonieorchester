import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/RichText'
import { formatDate, formatTime, mediaUrl, mediaAlt } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const nowIso = new Date().toISOString()

  const [settings, upcoming, news] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.find({
      collection: 'events',
      where: { and: [{ published: { equals: true } }, { date: { greater_than_equal: nowIso } }] },
      sort: 'date',
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: 'news',
      where: { published: { equals: true } },
      sort: '-publishedDate',
      limit: 3,
      depth: 1,
    }),
  ])

  const heroImg = mediaUrl(settings?.heroImage, 'hero')
  const name = settings?.orchestraName || 'Landshuter Symphonieorchester'

  return (
    <>
      {/* Hero */}
      <section className="hero">
        {heroImg && <img className="hero__img" src={heroImg} alt={mediaAlt(settings?.heroImage)} />}
        <div className="container">
          <div className="hero__inner">
            <p className="eyebrow">Klassische Musik aus Niederbayern</p>
            <h1>{name}</h1>
            {settings?.tagline && <p className="lead">{settings.tagline}</p>}
            <div className="hero__cta">
              <Link href="/konzerte" className="btn">Konzerte &amp; Termine</Link>
              <Link href="/seite/ueber-uns" className="btn btn--ghost">Über uns</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kurze Vorstellung */}
      {settings?.intro && (
        <section className="section">
          <div className="container">
            <RichText data={settings.intro} className="prose lead" />
          </div>
        </section>
      )}

      {/* Kommende Konzerte */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Demnächst</p>
              <h2>Kommende Konzerte</h2>
            </div>
            <Link href="/konzerte" className="btn btn--ghost">Alle Termine →</Link>
          </div>

          {upcoming.docs.length === 0 ? (
            <div className="notice">Aktuell sind keine kommenden Konzerte angekündigt. Schauen Sie bald wieder vorbei!</div>
          ) : (
            <div className="grid">
              {upcoming.docs.map((ev: any) => {
                const img = mediaUrl(ev.flyer, 'card')
                return (
                  <article className="card" key={ev.id}>
                    {img && <img className="card__media" src={img} alt={ev.title} />}
                    <div className="card__body">
                      <span className="card__date">{formatDate(ev.date)} · {formatTime(ev.date)}</span>
                      <h3 className="card__title">{ev.title}</h3>
                      {ev.location && <span className="card__meta">{ev.location}</span>}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Neuigkeiten */}
      {news.docs.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Aktuelles</p>
                <h2>Neuigkeiten</h2>
              </div>
              <Link href="/news" className="btn btn--ghost">Alle Neuigkeiten →</Link>
            </div>
            <div className="grid">
              {news.docs.map((n: any) => {
                const img = mediaUrl(n.image, 'card')
                return (
                  <article className="card" key={n.id}>
                    {img && <img className="card__media" src={img} alt={n.title} />}
                    <div className="card__body">
                      <span className="card__date">{formatDate(n.publishedDate)}</span>
                      <h3 className="card__title">{n.title}</h3>
                      {n.excerpt && <p className="card__meta">{n.excerpt}</p>}
                      <div className="card__foot">
                        <Link href={`/news/${n.slug}`}>Weiterlesen →</Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
