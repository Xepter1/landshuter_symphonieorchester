import type { Metadata } from 'next'
import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import './styles.css'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'settings' })
  const name = settings?.orchestraName || 'Landshuter Symphonieorchester'
  return {
    title: {
      default: name,
      template: `%s · ${name}`,
    },
    description: settings?.tagline || 'Konzerte, Termine und Neuigkeiten des Orchesters.',
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'settings' })
  const name = settings?.orchestraName || 'Symphonieorchester'

  return (
    <html lang="de">
      <body>
        <SiteHeader name={name} />
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
