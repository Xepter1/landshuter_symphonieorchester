import React from 'react'

// Kleine Bildmarke (X) im Kopf-Bereich neben den Breadcrumbs, theme-abhängig.
const css = `
.xepter-mark img { height: 24px; width: auto; }
.xepter-mark .x-light { display: none; }
.xepter-mark .x-dark { display: block; }
[data-theme='dark'] .xepter-mark .x-dark { display: none; }
[data-theme='dark'] .xepter-mark .x-light { display: block; }
`

export default function Icon() {
  return (
    <span className="xepter-mark">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <img className="x-dark" src="/brand/xepter-mark.svg" alt="Xepter" />
      <img className="x-light" src="/brand/xepter-mark-light.svg" alt="Xepter" />
    </span>
  )
}
