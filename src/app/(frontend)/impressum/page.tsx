import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/RichText'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Impressum' }

export default async function ImpressumPage() {
  const payload = await getPayloadClient()
  const s = await payload.findGlobal({ slug: 'settings' })

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '760px' }}>
        <h1>Impressum</h1>
        {s?.impressum ? (
          <RichText data={s.impressum} />
        ) : (
          <p className="muted">
            Die Pflichtangaben werden im Admin-Bereich unter „Einstellungen → Impressum" gepflegt.
          </p>
        )}
      </div>
    </section>
  )
}
