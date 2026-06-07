import type { CollectionConfig } from 'payload'

// Mitwirkende: feste Mitglieder (z. B. Dirigent) und wechselnde
// Solist:innen / Projektbeteiligte. Unterschieden über das Feld "kind".
export const Members: CollectionConfig = {
  slug: 'members',
  labels: {
    singular: 'Mitwirkende:r',
    plural: 'Mitwirkende',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'kind'],
    group: 'Inhalte',
    description: 'Feste Mitglieder und wechselnde Solist:innen / Projektbeteiligte.',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Rolle / Funktion (z. B. Dirigent, Violine, Sopran)',
    },
    {
      name: 'kind',
      type: 'select',
      label: 'Art',
      required: true,
      defaultValue: 'permanent',
      options: [
        { label: 'Festes Mitglied', value: 'permanent' },
        { label: 'Solist:in / Projektbeteiligte:r', value: 'guest' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Kurzbiografie',
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sortierung',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Kleinere Zahl = weiter oben.',
      },
    },
  ],
}
