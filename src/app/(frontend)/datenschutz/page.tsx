import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/RichText'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Datenschutzerklärung' }

export default async function DatenschutzPage() {
  const payload = await getPayloadClient()
  const s = await payload.findGlobal({ slug: 'settings' })

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '760px' }}>
        <h1>Datenschutzerklärung</h1>
        {s?.datenschutz ? (
          <RichText data={s.datenschutz} />
        ) : (
          <p className="muted">
            Die Datenschutzerklärung wird im Admin-Bereich unter „Einstellungen → Datenschutz" gepflegt.
          </p>
        )}
      </div>
    </section>
  )
}
