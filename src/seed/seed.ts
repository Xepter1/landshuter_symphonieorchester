import type { Payload } from 'payload'
import { rt } from './richtext'
import { makePlaceholder } from './images'

// Orchestriert das Seeding: Grundinhalte (falls keine Konzerte da sind) und
// die Galerie/Bilder (falls keine Alben da sind). Beide Teile sind einzeln
// abgesichert, damit z. B. eine bereits laufende Installation nachträglich
// die Galerie bekommt.
export async function seedIfEmpty(payload: Payload) {
  await seedContentIfEmpty(payload)
  await seedGalleryIfEmpty(payload)
  await seedLegalIfEmpty(payload)
  await clearPlaceholderHero(payload)
}

// Selbstheilung: Wenn das Hero-Bild noch das früher generierte Platzhalter-Bild
// (Dateiname "hero.jpg") ist, entfernen — dann greift das gebündelte Solisten-Foto.
// Idempotent: nach einmaligem Leeren passiert nichts mehr.
async function clearPlaceholderHero(payload: Payload) {
  const settings = await payload.findGlobal({ slug: 'settings', depth: 1 })
  const hero: any = settings?.heroImage
  if (hero && typeof hero === 'object' && hero.filename === 'hero.jpg') {
    payload.logger.info('🧹 Entferne altes Platzhalter-Hero-Bild (gebündeltes Foto übernimmt) …')
    const current = await payload.findGlobal({ slug: 'settings', depth: 0 })
    await payload.updateGlobal({ slug: 'settings', data: { ...current, heroImage: null } as any })
  }
}

// Standard-Datenschutzerklärung, passend zum tatsächlichen Datenverhalten
// dieser Seite (kein Tracking, keine Besucher-Cookies, Kontakt per E-Mail).
// MUSS vor Echtbetrieb rechtlich geprüft werden.
function datenschutzText() {
  return rt([
    ['h2', '1. Datenschutz auf einen Blick'],
    'Diese Website verarbeitet personenbezogene Daten nur im technisch notwendigen Umfang. Es werden keine Analyse- oder Tracking-Dienste eingesetzt und für Besucherinnen und Besucher keine Cookies gesetzt.',
    ['h2', '2. Verantwortlicher'],
    'Verantwortlich für die Datenverarbeitung auf dieser Website ist die im Impressum genannte Stelle. Die vollständigen Kontaktdaten finden Sie auf unserer Impressum-Seite.',
    ['h2', '3. Hosting & Server-Logfiles'],
    'Beim Aufruf dieser Website erfasst der Hosting-Server automatisch Informationen in sogenannten Server-Logfiles, die Ihr Browser übermittelt: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage sowie die IP-Adresse.',
    'Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und dienen ausschließlich dem sicheren und stabilen Betrieb der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer fehlerfreien Darstellung und Sicherheit).',
    ['h2', '4. Cookies'],
    'Für normale Besucherinnen und Besucher werden keine Cookies gesetzt. Lediglich im geschützten Verwaltungsbereich (Login) wird ein technisch notwendiges Cookie verwendet, um die Anmeldung aufrechtzuerhalten. Dieses ist für den Betrieb erforderlich und bedarf keiner Einwilligung.',
    ['h2', '5. Kontaktaufnahme'],
    'Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage und für mögliche Anschlussfragen gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.',
    ['h2', '6. Keine Analyse- und Tracking-Tools'],
    'Diese Website nutzt derzeit keine Webanalyse-Dienste (z. B. Google Analytics), keine Werbe-Netzwerke und keine eingebetteten Inhalte von Drittanbietern (z. B. YouTube, Google Maps). Sollte sich dies künftig ändern, wird diese Erklärung entsprechend ergänzt und – sofern erforderlich – eine Einwilligung (Cookie-Banner) eingeholt.',
    ['h2', '7. Ihre Rechte'],
    'Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO), deren Berichtigung (Art. 16), Löschung (Art. 17) oder Einschränkung der Verarbeitung (Art. 18), das Recht auf Datenübertragbarkeit (Art. 20) sowie ein Widerspruchsrecht (Art. 21). Wenden Sie sich dazu an die im Impressum genannte Stelle.',
    ['h2', '8. Beschwerderecht'],
    'Ihnen steht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts oder des mutmaßlichen Verstoßes.',
    ['h2', '9. Aktualität'],
    'Diese Datenschutzerklärung wird angepasst, sobald Änderungen an der Website oder an gesetzlichen Vorgaben dies erforderlich machen.',
  ]) as any
}

async function seedContentIfEmpty(payload: Payload) {
  const existing = await payload.count({ collection: 'events' })
  if (existing.totalDocs > 0) return

  payload.logger.info('🌱 Seeding Demo-Inhalte für das Landshuter Symphonieorchester …')

  const now = new Date()
  const inDays = (d: number) => {
    const date = new Date(now)
    date.setDate(date.getDate() + d)
    date.setHours(19, 30, 0, 0)
    return date.toISOString()
  }

  // --- Einstellungen / Global ---
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      orchestraName: 'Landshuter Symphonieorchester',
      tagline: 'Sinfonische Musik mit Leidenschaft – getragen von Menschen aus der Region.',
      banner: {
        enabled: true,
        text: '🎟️ Kartenvorverkauf für das Frühjahrskonzert läuft!',
        linkLabel: 'Zu den Konzerten',
        linkUrl: '/konzerte',
      },
      intro: rt([
        'Das Landshuter Symphonieorchester vereint engagierte Musikerinnen und Musiker aus Stadt und Landkreis. Von großer Sinfonik bis zu kammermusikalischen Projekten erarbeiten wir ein vielfältiges Repertoire – und bringen es in Konzerten überall in Niederbayern auf die Bühne.',
        'Unter der Leitung unseres Dirigenten und mit wechselnden Solist:innen entstehen Programme, die klassische Meisterwerke und überraschende Entdeckungen verbinden.',
      ]) as any,
      email: 'kontakt@landshuter-symphonieorchester.de',
      phone: '+49 871 0000000',
      address: 'Landshuter Symphonieorchester e. V.\nMusterstraße 1\n84028 Landshut',
      contactNote: rt([
        'Sie möchten bei uns mitspielen, uns für ein Projekt gewinnen oder einfach mehr erfahren? Wir freuen uns auf Ihre Nachricht.',
      ]) as any,
      social: [{ platform: 'Instagram', url: 'https://instagram.com' }],
      impressum: rt([
        ['h2', 'Angaben gemäß § 5 DDG'],
        'Landshuter Symphonieorchester e. V.\nMusterstraße 1, 84028 Landshut',
        ['h3', 'Vertreten durch'],
        '1. Vorsitzende:r: Max Mustermann',
        ['h3', 'Kontakt'],
        'Telefon: +49 871 0000000\nE-Mail: kontakt@landshuter-symphonieorchester.de',
        ['h3', 'Verantwortlich für den Inhalt'],
        'Max Mustermann, Anschrift wie oben.',
      ]) as any,
      datenschutz: datenschutzText(),
    },
  })

  // --- Seite „Über uns" ---
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Über uns',
      slug: 'ueber-uns',
      content: rt([
        'Das Landshuter Symphonieorchester wurde von musikbegeisterten Menschen gegründet, die ihre Freude am gemeinsamen Musizieren teilen möchten. Heute zählt das Ensemble Mitglieder aller Generationen.',
        ['h2', 'Unser Anspruch'],
        'Wir verstehen Musik als verbindende Kraft. In intensiven Probenphasen erarbeiten wir Programme, die wir mit Hingabe und auf hohem Niveau zur Aufführung bringen.',
        ['h2', 'Mitspielen'],
        'Du spielst ein Orchesterinstrument und möchtest Teil des Ensembles werden? Melde dich gern über unsere Kontaktseite – wir freuen uns über Verstärkung!',
      ]) as any,
    },
  })

  // --- Mitwirkende ---
  await payload.create({
    collection: 'members',
    data: { name: 'Johanna Beck', role: 'Dirigentin & Künstlerische Leitung', kind: 'permanent', sortOrder: 1 },
  })
  await payload.create({
    collection: 'members',
    data: { name: 'Thomas Reiter', role: 'Konzertmeister (Violine)', kind: 'permanent', sortOrder: 2 },
  })
  await payload.create({
    collection: 'members',
    data: { name: 'Clara Lindner', role: 'Orchestervorstand', kind: 'permanent', sortOrder: 3 },
  })
  await payload.create({
    collection: 'members',
    data: { name: 'David Sokolov', role: 'Klavier (Solist)', kind: 'guest', sortOrder: 10 },
  })
  await payload.create({
    collection: 'members',
    data: { name: 'Maria Esposito', role: 'Sopran (Solistin)', kind: 'guest', sortOrder: 11 },
  })

  // --- Konzerte ---
  await payload.create({
    collection: 'events',
    data: {
      title: 'Frühjahrskonzert: Beethoven & Dvořák',
      date: inDays(28),
      location: 'Stadttheater Landshut',
      description: rt([
        'Ludwig van Beethoven – Sinfonie Nr. 7 A-Dur, op. 92',
        'Antonín Dvořák – Cellokonzert h-Moll, op. 104',
      ]) as any,
      ticketUrl: 'https://example.com/tickets',
      published: true,
    },
  })
  await payload.create({
    collection: 'events',
    data: {
      title: 'Sommerserenade im Hofgarten',
      date: inDays(63),
      location: 'Hofgarten der Stadtresidenz Landshut',
      description: rt([
        'Ein sommerlicher Abend mit beschwingten Stücken von Mozart, Bizet und Strauß – open air bei freiem Eintritt.',
      ]) as any,
      published: true,
    },
  })
  await payload.create({
    collection: 'events',
    data: {
      title: 'Adventskonzert (Rückblick)',
      date: inDays(-45),
      location: 'Basilika St. Martin',
      description: rt([
        'Festliche Musik zur Weihnachtszeit mit Werken von Bach und Corelli – ein stimmungsvoller Jahresabschluss.',
      ]) as any,
      published: true,
    },
  })

  // --- Neuigkeiten ---
  await payload.create({
    collection: 'news',
    data: {
      title: 'Karten für das Frühjahrskonzert ab sofort erhältlich',
      slug: 'karten-fruehjahrskonzert',
      publishedDate: inDays(-3),
      excerpt: 'Sichern Sie sich Ihre Plätze für unser großes Frühjahrskonzert im Stadttheater.',
      content: rt([
        'Der Vorverkauf für unser Frühjahrskonzert hat begonnen. Karten gibt es online sowie an den bekannten Vorverkaufsstellen in Landshut.',
        'Wir freuen uns auf einen Abend mit Beethovens mitreißender 7. Sinfonie und Dvořáks Cellokonzert.',
      ]) as any,
      published: true,
    },
  })
  await payload.create({
    collection: 'news',
    data: {
      title: 'Wir suchen Verstärkung in den Streichern',
      slug: 'verstaerkung-streicher',
      publishedDate: inDays(-12),
      excerpt: 'Das Orchester freut sich über neue Mitspieler:innen – besonders in den Streichergruppen.',
      content: rt([
        'Du spielst Violine, Viola, Violoncello oder Kontrabass und hast Lust auf gemeinsames Musizieren? Komm gern zu einer Probe vorbei.',
        'Melde dich einfach über unsere Kontaktseite – wir freuen uns auf dich!',
      ]) as any,
      published: true,
    },
  })

  payload.logger.info('✅ Demo-Inhalte angelegt.')
}

// Galerie + Platzhalterbilder. Eigener Guard (Alben), damit auch eine bereits
// bestehende Installation die Galerie nachträglich erhält.
async function seedGalleryIfEmpty(payload: Payload) {
  const existing = await payload.count({ collection: 'albums' })
  if (existing.totalDocs > 0) return

  payload.logger.info('🖼️  Seeding Galerie + Platzhalterbilder …')

  // Farbpaletten (innerhalb des Bordeaux/Gold-Designs)
  const palettes = [
    ['#4a1f1f', '#7a2e2e'],
    ['#5c2222', '#b08d57'],
    ['#2a1414', '#6e2a2a'],
    ['#6e2a2a', '#b08d57'],
    ['#3a1a1a', '#8a3a3a'],
  ]

  const makeAlbumPhotos = async (prefix: string, count: number) => {
    const ids: number[] = []
    for (let i = 0; i < count; i++) {
      const [from, to] = palettes[i % palettes.length]
      ids.push(
        await makePlaceholder(payload, {
          name: `${prefix}-${i + 1}.jpg`,
          label: `${prefix} · Foto ${i + 1}`,
          from,
          to,
        }),
      )
    }
    return ids
  }

  // Album 1: Frühjahrskonzert
  const photos1 = await makeAlbumPhotos('Fruehjahr', 6)
  await payload.create({
    collection: 'albums',
    data: {
      title: 'Frühjahrskonzert 2026',
      slug: 'fruehjahrskonzert-2026',
      date: new Date().toISOString(),
      description: 'Impressionen unseres großen Frühjahrskonzerts im Stadttheater.',
      coverImage: photos1[0],
      photos: photos1,
      published: true,
    },
  })

  // Album 2: Probenwochenende
  const photos2 = await makeAlbumPhotos('Probe', 4)
  await payload.create({
    collection: 'albums',
    data: {
      title: 'Probenwochenende',
      slug: 'probenwochenende',
      date: new Date().toISOString(),
      description: 'Konzentriert und mit Freude – Eindrücke von unserem Probenwochenende.',
      coverImage: photos2[0],
      photos: photos2,
      published: true,
    },
  })

  // Kein Hero-Platzhalter mehr: das Frontend nutzt standardmäßig das
  // gebündelte Solisten-Foto (public/hero-solist-clean.jpg). Über Einstellungen →
  // Startseite → Hero-Bild lässt sich jederzeit ein eigenes Bild setzen.

  payload.logger.info('✅ Galerie angelegt.')
}

// Setzt die Datenschutzerklärung einmalig, falls noch keine hinterlegt ist.
// Idempotent – überschreibt eine bereits gepflegte Erklärung nicht.
async function seedLegalIfEmpty(payload: Payload) {
  const settings = await payload.findGlobal({ slug: 'settings', depth: 0 })
  if (settings?.datenschutz) return

  payload.logger.info('📄 Datenschutzerklärung (Standardtext) wird gesetzt …')
  await payload.updateGlobal({
    slug: 'settings',
    data: { ...settings, datenschutz: datenschutzText() } as any,
  })
}
