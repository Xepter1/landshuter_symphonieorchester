import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/RichText'
import { formatDate, mediaUrl, mediaAlt } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'news',
    where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
    limit: 1,
    depth: 1,
  })

  const article = res.docs[0] as any
  if (!article) notFound()

  const img = mediaUrl(article.image, 'hero')

  return (
    <article className="section">
      <div className="container" style={{ maxWidth: '760px' }}>
        <Link href="/news" className="muted">← Alle Neuigkeiten</Link>
        <p className="eyebrow" style={{ marginTop: '1rem' }}>{formatDate(article.publishedDate)}</p>
        <h1>{article.title}</h1>
        {img && (
          <img
            src={img}
            alt={mediaAlt(article.image) || article.title}
            style={{ borderRadius: '10px', margin: '1.5rem 0', width: '100%' }}
          />
        )}
        <RichText data={article.content} />
      </div>
    </article>
  )
}
