'use client'

import { useEffect, useState } from 'react'

type BannerProps = {
  text: string
  linkLabel?: string | null
  linkUrl?: string | null
}

// Ankündigungs-Banner ganz oben. Schließbar; die Entscheidung wird pro Text
// im Browser gemerkt (localStorage), damit ein neuer Text wieder erscheint.
export function Banner({ text, linkLabel, linkUrl }: BannerProps) {
  const [visible, setVisible] = useState(false)
  // eindeutiger Schlüssel pro Banner-Text
  const key = 'lso-banner-' + (text || '').slice(0, 40)

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(key) !== 'dismissed')
    } catch {
      setVisible(true)
    }
  }, [key])

  if (!visible || !text) return null

  const dismiss = () => {
    try {
      localStorage.setItem(key, 'dismissed')
    } catch {}
    setVisible(false)
  }

  return (
    <div className="banner" role="region" aria-label="Ankündigung">
      <div className="container banner__inner">
        <span className="banner__text">{text}</span>
        {linkUrl && linkLabel && (
          <a className="banner__btn" href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkLabel}
          </a>
        )}
        <button className="banner__close" onClick={dismiss} aria-label="Banner schließen">
          ✕
        </button>
      </div>
    </div>
  )
}
