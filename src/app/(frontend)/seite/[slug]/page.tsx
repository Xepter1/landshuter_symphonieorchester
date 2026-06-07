import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/RichText'
import { mediaUrl, mediaAlt } from '@/lib/format'

export const dynamic = 'force-dynamic'

async function getPage(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] as any | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  return { title: page?.title || 'Seite' }
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  const hero = mediaUrl(page.heroImage, 'hero')

  return (
    <article className="section">
      <div className="container">
        <p className="eyebrow">Landshuter Symphonieorchester</p>
        <h1>{page.title}</h1>
        {hero && (
          <img
            src={hero}
            alt={mediaAlt(page.heroImage) || page.title}
            style={{ borderRadius: '10px', margin: '1.5rem 0', width: '100%', maxHeight: '420px', objectFit: 'cover' }}
          />
        )}
        <RichText data={page.content} />
      </div>
    </article>
  )
}
