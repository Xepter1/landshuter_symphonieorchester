import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const base = (process.env.PUBLIC_URL || 'http://localhost:3000').replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()

  const [news, albums, pages] = await Promise.all([
    payload.find({ collection: 'news', where: { published: { equals: true } }, limit: 500, depth: 0 }),
    payload.find({ collection: 'albums', where: { published: { equals: true } }, limit: 500, depth: 0 }),
    payload.find({ collection: 'pages', limit: 500, depth: 0 }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/konzerte`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/galerie`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/mitwirkende`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/news`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/kontakt`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/impressum`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/datenschutz`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const newsRoutes: MetadataRoute.Sitemap = news.docs
    .filter((n: any) => n.slug)
    .map((n: any) => ({ url: `${base}/news/${n.slug}`, lastModified: n.updatedAt, changeFrequency: 'monthly', priority: 0.6 }))

  const albumRoutes: MetadataRoute.Sitemap = albums.docs
    .filter((a: any) => a.slug)
    .map((a: any) => ({ url: `${base}/galerie/${a.slug}`, lastModified: a.updatedAt, changeFrequency: 'monthly', priority: 0.5 }))

  const pageRoutes: MetadataRoute.Sitemap = pages.docs
    .filter((p: any) => p.slug)
    .map((p: any) => ({ url: `${base}/seite/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'monthly', priority: 0.5 }))

  return [...staticRoutes, ...newsRoutes, ...albumRoutes, ...pageRoutes]
}
