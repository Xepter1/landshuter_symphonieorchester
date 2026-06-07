// Deutsche Datums-/Zeitformatierung.

const dateFmt = new Intl.DateTimeFormat('de-DE', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const timeFmt = new Intl.DateTimeFormat('de-DE', {
  hour: '2-digit',
  minute: '2-digit',
})

const shortDateFmt = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export const formatDate = (value?: string | null) =>
  value ? dateFmt.format(new Date(value)) : ''

export const formatTime = (value?: string | null) =>
  value ? `${timeFmt.format(new Date(value))} Uhr` : ''

export const formatShortDate = (value?: string | null) =>
  value ? shortDateFmt.format(new Date(value)) : ''

// Hilft bei Media-Relationen: kann Objekt oder ID sein.
type MediaLike = {
  url?: string | null
  alt?: string | null
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }>
}

export const mediaUrl = (media: unknown, size?: string): string | null => {
  if (!media || typeof media !== 'object') return null
  const m = media as MediaLike
  if (size && m.sizes?.[size]?.url) return m.sizes[size]!.url ?? null
  return m.url ?? null
}

export const mediaAlt = (media: unknown): string => {
  if (!media || typeof media !== 'object') return ''
  return (media as MediaLike).alt ?? ''
}
