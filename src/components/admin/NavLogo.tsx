import React from 'react'

// Volle Xepter-Wortmarke ganz oben in der Sidebar, ÜBER den Menüpunkten.
// Theme-abhängig: heller Modus -> dunkles Logo, dunkler Modus -> helles Logo.
const css = `
.xepter-navlogo { padding: 20px 16px 12px; }
.xepter-navlogo img { width: 100%; max-width: 180px; height: auto; }
.xepter-navlogo .x-light { display: none; }
.xepter-navlogo .x-dark { display: block; }
[data-theme='dark'] .xepter-navlogo .x-dark { display: none; }
[data-theme='dark'] .xepter-navlogo .x-light { display: block; }
`

export default function NavLogo() {
  return (
    <div className="xepter-navlogo">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <img className="x-dark" src="/brand/xepter-logo-dark.svg" alt="Xepter" />
      <img className="x-light" src="/brand/xepter-logo-light.svg" alt="Xepter" />
    </div>
  )
}
