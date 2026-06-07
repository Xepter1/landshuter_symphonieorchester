import type { Metadata } from 'next'
import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Banner } from '@/components/Banner'
import { mediaUrl } from '@/lib/format'
import './styles.css'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'settings' })
  const name = settings?.orchestraName || 'Landshuter Symphonieorchester'
  const description = settings?.tagline || 'Konzerte, Termine und Neuigkeiten des Orchesters.'
  const base = process.env.PUBLIC_URL || 'http://localhost:3000'
  const ogImage = mediaUrl(settings?.heroImage, 'hero')

  return {
    metadataBase: new URL(base),
    title: {
      default: name,
      template: `%s · ${name}`,
    },
    description,
    openGraph: {
      title: name,
      description,
      siteName: name,
      locale: 'de_DE',
      type: 'website',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: name,
      description,
    },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'settings' })
  const name = settings?.orchestraName || 'Symphonieorchester'
  const logoUrl = mediaUrl(settings?.logo)
  const banner = settings?.banner

  return (
    <html lang="de">
      <body>
        {banner?.enabled && banner?.text && (
          <Banner text={banner.text} linkLabel={banner.linkLabel} linkUrl={banner.linkUrl} />
        )}
        <SiteHeader name={name} logoUrl={logoUrl} />
        <main>{children}</main>
        <SiteFooter
          name={name}
          email={settings?.email}
          phone={settings?.phone}
          address={settings?.address}
          social={settings?.social}
        />
      </body>
    </html>
  )
}
