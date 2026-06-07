import { getPayloadClient } from '@/lib/payload'
import { mediaUrl } from '@/lib/format'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Mitwirkende' }

function MemberGrid({ members }: { members: any[] }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
      {members.map((m) => {
        const photo = mediaUrl(m.photo, 'thumbnail')
        return (
          <div className="member" key={m.id}>
            {photo ? (
              <img className="member__photo" src={photo} alt={m.name} />
            ) : (
              <div className="member__photo" aria-hidden="true" />
            )}
            <p className="member__name">{m.name}</p>
            {m.role && <p className="member__role">{m.role}</p>}
          </div>
        )
      })}
    </div>
  )
}

export default async function MitwirkendePage() {
  const payload = await getPayloadClient()
  const all = await payload.find({
    collection: 'members',
    sort: 'sortOrder',
    limit: 200,
    depth: 1,
  })

  const permanent = all.docs.filter((m: any) => m.kind === 'permanent')
  const guests = all.docs.filter((m: any) => m.kind === 'guest')

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Das Ensemble</p>
        <h1>Mitwirkende</h1>

        {permanent.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h2>Feste Mitglieder</h2>
            <div style={{ marginTop: '1.5rem' }}>
              <MemberGrid members={permanent} />
            </div>
          </div>
        )}

        {guests.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h2>Solist:innen &amp; Projektbeteiligte</h2>
            <div style={{ marginTop: '1.5rem' }}>
              <MemberGrid members={guests} />
            </div>
          </div>
        )}

        {all.docs.length === 0 && (
          <div className="notice" style={{ marginTop: '2rem' }}>
            Hier werden bald die Mitwirkenden des Orchesters vorgestellt.
          </div>
        )}
      </div>
    </section>
  )
}
