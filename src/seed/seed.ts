import type { Payload } from 'payload'
import { rt } from './richtext'

// Befüllt die Website einmalig mit realistischen Demo-Inhalten,
// damit man das Design sofort sieht. Läuft nur, wenn noch keine
// Konzerte existieren (idempotent).
export async function seedIfEmpty(payload: Payload) {
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
