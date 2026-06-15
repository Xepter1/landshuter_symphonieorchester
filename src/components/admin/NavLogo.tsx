import React from 'react'

// Volle Xepter-Wortmarke oben in der Sidebar, mit Trennlinie darunter.
// Theme-abhängig: heller Modus -> dunkles Logo, dunkler Modus -> helles Logo.
const css = `
.xepter-brand {
  padding: 16px 16px 14px; margin-bottom: 4px;
  border-bottom: 1px solid var(--theme-elevation-100);
}
.xepter-brand img { width: 100%; max-width: 165px; height: auto; }
.xepter-brand .x-light { display: none; }
.xepter-brand .x-dark { display: block; }
[data-theme='dark'] .xepter-brand .x-dark { display: none; }
[data-theme='dark'] .xepter-brand .x-light { display: block; }
`

export default function NavLogo() {
  return (
    <div className="xepter-brand">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <img className="x-dark" src="/brand/xepter-logo-dark.svg" alt="Xepter" />
      <img className="x-light" src="/brand/xepter-logo-light.svg" alt="Xepter" />
    </div>
  )
}
