import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Events } from './collections/Events'
import { News } from './collections/News'
import { Members } from './collections/Members'
import { Albums } from './collections/Albums'
import { Settings } from './globals/Settings'
import { seedIfEmpty } from './seed/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Landshuter Symphonieorchester',
      description: 'Verwaltung der Website des Landshuter Symphonieorchesters',
    },
  },
  // Reihenfolge = Reihenfolge in der Admin-Sidebar
  collections: [Pages, Events, News, Members, Albums, Media, Users],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./landshuter.db',
    },
    // In Entwicklung: Schema automatisch synchronisieren (push).
    // In Produktion: über Migrationen (werden beim Containerstart ausgeführt).
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  // Beim ersten Start einmalig Demo-Inhalte anlegen (nur wenn DB leer ist).
  onInit: async (payload) => {
    await seedIfEmpty(payload)
  },
  sharp,
  // Deutsche Admin-Oberfläche als Standard (Payload liefert die de-Übersetzung mit)
  i18n: {
    fallbackLanguage: 'de',
  },
})
