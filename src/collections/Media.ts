import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Zentrale Medien-Bibliothek: Bilder UND PDFs (z. B. Konzertflyer).
// Dateien werden lokal unter /media abgelegt.
export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medium',
    plural: 'Medien',
  },
  admin: {
    group: 'Inhalte',
    description: 'Bilder und PDF-Dateien (Flyer) zum Wiederverwenden.',
  },
  access: {
    read: () => true, // öffentlich lesbar (für die Website)
  },
  upload: {
    // In Produktion/Docker per MEDIA_DIR auf ein persistentes Volume zeigen.
    staticDir: process.env.MEDIA_DIR || path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*', 'application/pdf'],
    // Automatische Bildgrößen für schnelles, responsives Laden
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined, position: 'centre' },
      { name: 'card', width: 768, height: undefined, position: 'centre' },
      { name: 'hero', width: 1600, height: undefined, position: 'centre' },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternativtext (Barrierefreiheit / SEO)',
      admin: {
        description: 'Kurze Bildbeschreibung. Bei PDF-Flyern optional.',
      },
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Bildnachweis / Fotograf:in',
    },
  ],
}
