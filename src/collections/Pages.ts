import type { CollectionConfig } from 'payload'

// Flexible Inhaltsseiten (z. B. „Über uns" und beliebige weitere Seiten).
// Über den Slug an die URL gebunden, z. B. /seite/ueber-uns
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Seite',
    plural: 'Seiten',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    group: 'Inhalte',
    description: 'Textseiten wie „Über uns". Kontakt & Impressum stehen in den Einstellungen.',
  },
  access: {
    read: () => true,
    // Seiten verwaltet der Entwickler. Redakteure (Kunde) pflegen nur den Inhalt
    // bestehender Seiten – Neuanlegen und Löschen sind gesperrt, damit die
    // Menüstruktur (z. B. „Über uns") nicht versehentlich zerstört wird.
    create: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL-Kürzel',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description:
          'Adresse der Seite (/seite/<kürzel>). Fest hinterlegt, damit Menü-Links nicht brechen – nur der Entwickler ändert sie.',
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
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Kopfbild (optional)',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
    },
  ],
}
