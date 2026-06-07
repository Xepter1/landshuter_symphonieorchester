import type { CollectionConfig } from 'payload'

// Konzerttermine / Veranstaltungen.
// Vergangene Termine wandern automatisch ins "Archiv" (über das Datum) –
// gelöscht werden muss nichts, kann aber.
export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Konzert / Termin',
    plural: 'Konzerte / Termine',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'published'],
    group: 'Inhalte',
    description: 'Konzerttermine veröffentlichen, bearbeiten und archivieren.',
  },
  access: {
    read: () => true,
  },
  defaultSort: '-date',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel des Konzerts',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          type: 'date',
          label: 'Datum & Uhrzeit',
          required: true,
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd.MM.yyyy HH:mm' },
          },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Ort / Veranstaltungsort',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung / Programm',
    },
    {
      name: 'performers',
      type: 'relationship',
      relationTo: 'members',
      hasMany: true,
      label: 'Mitwirkende (Dirigent, Solist:innen …)',
      admin: {
        description: 'Verknüpfe Personen aus dem Bereich „Mitwirkende".',
      },
    },
    {
      name: 'flyer',
      type: 'upload',
      relationTo: 'media',
      label: 'Konzertflyer (PDF oder Bild)',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Fotos (Galerie)',
      labels: { singular: 'Foto', plural: 'Fotos' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'ticketUrl',
      type: 'text',
      label: 'Link zum Ticketverkauf (optional)',
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Veröffentlicht',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Abhaken = auf der Website sichtbar.',
      },
    },
  ],
}
