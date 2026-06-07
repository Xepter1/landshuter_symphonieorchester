import type { CollectionConfig } from 'payload'

// Aktuelle Ankündigungen / Neuigkeiten.
export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Neuigkeit',
    plural: 'Neuigkeiten',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'published'],
    group: 'Inhalte',
    description: 'Aktuelle Ankündigungen und Neuigkeiten.',
  },
  access: {
    read: () => true,
  },
  defaultSort: '-publishedDate',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Überschrift',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL-Kürzel',
      admin: {
        position: 'sidebar',
        description: 'Wird aus der Überschrift erzeugt, falls leer.',
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
      name: 'publishedDate',
      type: 'date',
      label: 'Veröffentlicht am',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Titelbild',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Kurzfassung (für Übersicht & Startseite)',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
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
