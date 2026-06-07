import type { GlobalConfig } from 'payload'

// Zentrale Einstellungen der Website: Name, Startseiten-Vorstellung,
// Kontaktangaben (auch im Footer) und Impressum-Pflichtangaben.
// Ein "Global" ist ein Einzeldatensatz – ideal für solche Stammdaten.
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Einstellungen',
  admin: {
    group: 'Verwaltung',
    description: 'Name, Startseiten-Text, Kontakt & Impressum.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Allgemein',
          fields: [
            {
              name: 'orchestraName',
              type: 'text',
              label: 'Name des Orchesters',
              required: true,
              defaultValue: 'Landshuter Symphonieorchester',
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Slogan / Untertitel',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo (optional)',
            },
          ],
        },
        {
          label: 'Banner',
          fields: [
            {
              name: 'banner',
              type: 'group',
              label: 'Ankündigungs-Banner',
              admin: {
                description: 'Auffälliger Hinweis ganz oben auf jeder Seite (z. B. Kartenvorverkauf).',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Banner anzeigen',
                  defaultValue: false,
                },
                {
                  name: 'text',
                  type: 'text',
                  label: 'Text',
                  admin: { description: 'z. B. „🎟️ Kartenvorverkauf für das Frühjahrskonzert läuft!"' },
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'linkLabel', type: 'text', label: 'Button-Text (optional)', admin: { width: '50%' } },
                    { name: 'linkUrl', type: 'text', label: 'Button-Link (optional)', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Startseite',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Großes Kopfbild',
            },
            {
              name: 'intro',
              type: 'richText',
              label: 'Kurze Vorstellung des Orchesters',
            },
          ],
        },
        {
          label: 'Kontakt',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', label: 'E-Mail', admin: { width: '50%' } },
                { name: 'phone', type: 'text', label: 'Telefon', admin: { width: '50%' } },
              ],
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Anschrift',
            },
            {
              name: 'contactNote',
              type: 'richText',
              label: 'Zusätzlicher Text auf der Kontaktseite',
            },
            {
              name: 'social',
              type: 'array',
              label: 'Social-Media-Links',
              labels: { singular: 'Link', plural: 'Links' },
              fields: [
                { name: 'platform', type: 'text', label: 'Plattform (z. B. Instagram)' },
                { name: 'url', type: 'text', label: 'URL' },
              ],
            },
          ],
        },
        {
          label: 'Impressum',
          fields: [
            {
              name: 'impressum',
              type: 'richText',
              label: 'Pflichtangaben (Impressum)',
              admin: {
                description: 'Verantwortliche Person, Anschrift, Kontakt, ggf. Registereintrag.',
              },
            },
          ],
        },
        {
          label: 'Datenschutz',
          fields: [
            {
              name: 'datenschutz',
              type: 'richText',
              label: 'Datenschutzerklärung',
              admin: {
                description:
                  'Vorausgefüllter Standardtext passend zu dieser Website. WICHTIG: vor dem Echtbetrieb von einer fachkundigen Person (Anwalt/Datenschutzbeauftragte) prüfen lassen und an die tatsächlichen Gegebenheiten anpassen.',
              },
            },
          ],
        },
      ],
    },
  ],
}
