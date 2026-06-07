import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { formatDate, mediaUrl } from '@/lib/format'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Neuigkeiten' }

export default async function NewsListPage() {
  const payload = await getPayloadClient()
  const news = await payload.find({
    collection: 'news',
    where: { published: { equals: true } },
    sort: '-publishedDate',
    limit: 50,
    depth: 1,
  })

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Aktuelles</p>
        <h1>Neuigkeiten</h1>

        {news.docs.length === 0 ? (
          <div className="notice" style={{ marginTop: '2rem' }}>Noch keine Neuigkeiten veröffentlicht.</div>
        ) : (
          <div className="grid" style={{ marginTop: '2rem' }}>
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
        )}
      </div>
    </section>
  )
}
