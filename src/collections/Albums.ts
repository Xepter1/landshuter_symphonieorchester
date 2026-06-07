import type { CollectionConfig } from 'payload'

// Foto-Alben (z. B. „Frühjahrskonzert 2026", „Probenwochenende").
// Fotos werden per Drag & Drop in EIN Feld hochgeladen – maximal einfach.
// Optional mit einem Konzert verknüpfbar.
export const Albums: CollectionConfig = {
  slug: 'albums',
  labels: {
    singular: 'Galerie / Album',
    plural: 'Galerie',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'published'],
    group: 'Inhalte',
    description: 'Foto-Alben für die Bildergalerie der Website.',
  },
  access: {
    read: () => true,
  },
  defaultSort: '-date',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel des Albums',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL-Kürzel',
      admin: {
        position: 'sidebar',
        description: 'Wird aus dem Titel erzeugt, falls leer.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return data?.title
              ?.toLowerCase()
              .replace(/[äàá]/g, 'a')
              .replace(/[öòó]/g, 'o')
              .replace(/[üùú]/g, 'u')
              .replace(/ß/g, 'ss')
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
        ],
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Datum',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kurzbeschreibung (optional)',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Titelbild (optional)',
      admin: {
        description: 'Wird in der Übersicht angezeigt. Leer = erstes Foto wird genommen.',
      },
    },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Fotos',
      admin: {
        description: 'Mehrere Bilder gleichzeitig per Drag & Drop hochladen.',
      },
    },
    {
      name: 'relatedEvent',
      type: 'relationship',
      relationTo: 'events',
      label: 'Gehört zu Konzert (optional)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Veröffentlicht',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
