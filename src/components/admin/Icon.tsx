import React from 'react'

// Xepter-Wortmarke im festen Kopf-Bereich (oben, klappt NICHT mit der Sidebar ein).
// Theme-abhängig. Der .graphic-icon-Override hebt die enge Standard-Breite auf,
// damit die volle Wortmarke (nicht abgeschnitten) Platz hat.
const css = `
.graphic-icon { width: auto !important; height: auto !important; overflow: visible !important; }
.xepter-mark img { height: 24px; width: auto; display: block; }
.xepter-mark .x-light { display: none; }
.xepter-mark .x-dark { display: block; }
[data-theme='dark'] .xepter-mark .x-dark { display: none; }
[data-theme='dark'] .xepter-mark .x-light { display: block; }
`

export default function Icon() {
  return (
    <span className="xepter-mark">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <img className="x-dark" src="/brand/xepter-logo-dark.svg" alt="Xepter" />
      <img className="x-light" src="/brand/xepter-logo-light.svg" alt="Xepter" />
    </span>
  )
}
