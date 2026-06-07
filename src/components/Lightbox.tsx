'use client'

import { useCallback, useEffect, useState } from 'react'

type Photo = { url: string; alt?: string; thumb?: string }

// Foto-Galerie mit Klick-zum-Vergrößern (Lightbox).
// Tastatur: ←/→ blättern, ESC schließt. Klick auf Hintergrund schließt.
export function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null)

  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, prev, next])

  return (
    <>
      <div className="gallery-grid">
        {photos.map((p, i) => (
          <button
            key={i}
            className="gallery-thumb"
            onClick={() => setIndex(i)}
            aria-label={`Foto ${i + 1} vergrößern`}
          >
            <img src={p.thumb || p.url} alt={p.alt || ''} loading="lazy" />
          </button>
        ))}
      </div>

      {index !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lightbox__close" onClick={close} aria-label="Schließen">✕</button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Vorheriges Foto"
          >‹</button>
          <img
            className="lightbox__img"
            src={photos[index].url}
            alt={photos[index].alt || ''}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Nächstes Foto"
          >›</button>
          <div className="lightbox__count">{index + 1} / {photos.length}</div>
        </div>
      )}
    </>
  )
}
