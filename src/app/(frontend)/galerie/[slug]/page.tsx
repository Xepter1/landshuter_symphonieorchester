import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { Gallery } from '@/components/Lightbox'
import { formatDate, mediaUrl, mediaAlt } from '@/lib/format'

export const dynamic = 'force-dynamic'

async function getAlbum(slug: string) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'albums',
    where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] as any | undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const album = await getAlbum(slug)
  return { title: album?.title || 'Galerie' }
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const album = await getAlbum(slug)
  if (!album) notFound()

  const photos = (Array.isArray(album.photos) ? album.photos : [])
    .filter((p: any) => p && typeof p === 'object')
    .map((p: any) => ({
      url: mediaUrl(p, 'hero') || mediaUrl(p) || '',
      thumb: mediaUrl(p, 'card') || mediaUrl(p) || '',
      alt: mediaAlt(p) || album.title,
    }))
    .filter((p: any) => p.url)

  return (
    <section className="section">
      <div className="container">
        <Link href="/galerie" className="muted">← Zur Galerie</Link>
        <p className="eyebrow" style={{ marginTop: '1rem' }}>Album</p>
        <h1>{album.title}</h1>
        {album.date && <p className="muted">{formatDate(album.date)}</p>}
        {album.description && <p className="lead" style={{ marginTop: '0.5rem' }}>{album.description}</p>}

        <div style={{ marginTop: '2rem' }}>
          {photos.length === 0 ? (
            <div className="notice">Für dieses Album wurden noch keine Fotos hinterlegt.</div>
          ) : (
            <Gallery photos={photos} />
          )}
        </div>
      </div>
    </section>
  )
}
