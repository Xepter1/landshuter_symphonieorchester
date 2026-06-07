import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { formatShortDate, mediaUrl } from '@/lib/format'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Galerie' }

export default async function GaleriePage() {
  const payload = await getPayloadClient()
  const albums = await payload.find({
    collection: 'albums',
    where: { published: { equals: true } },
    sort: '-date',
    limit: 100,
    depth: 1,
  })

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Eindrücke</p>
        <h1>Galerie</h1>

        {albums.docs.length === 0 ? (
          <div className="notice" style={{ marginTop: '2rem' }}>
            Hier entstehen bald Fotoalben unserer Konzerte und Projekte.
          </div>
        ) : (
          <div className="grid" style={{ marginTop: '2rem' }}>
            {albums.docs.map((al: any) => {
              const photos = Array.isArray(al.photos) ? al.photos : []
              const cover = mediaUrl(al.coverImage, 'card') || (photos[0] && mediaUrl(photos[0], 'card'))
              const count = photos.length
              return (
                <Link className="album-card" href={`/galerie/${al.slug}`} key={al.id}>
                  <div className="album-card__media">
                    {cover ? <img src={cover} alt={al.title} loading="lazy" /> : <div className="album-card__placeholder">📷</div>}
                    <span className="album-card__count">{count} {count === 1 ? 'Foto' : 'Fotos'}</span>
                  </div>
                  <div className="album-card__body">
                    <h3 className="card__title">{al.title}</h3>
                    {al.date && <span className="card__meta">{formatShortDate(al.date)}</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
