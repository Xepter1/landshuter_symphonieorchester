import React from 'react'

// „✕ CMS"-Markenkopf ganz oben in der Sidebar, mit Trennlinie darunter.
// Farben über Payload-Theme-Variablen -> passt sich hell/dunkel automatisch an.
const css = `
.xepter-brand {
  display: flex; align-items: center; gap: 10px;
  padding: 16px 14px 14px; margin-bottom: 4px;
  border-bottom: 1px solid var(--theme-elevation-100);
}
.xepter-brand svg { height: 26px; width: auto; flex: 0 0 auto; }
.xepter-brand .brand-text {
  font-weight: 700; font-size: 17px; letter-spacing: 0.06em;
  color: var(--theme-text);
}
`

export default function NavLogo() {
  return (
    <div className="xepter-brand">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg viewBox="0 0 113.72 128.84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M38.39,70.69h26.77l6.68,5.08-36.56,53.07H0s38.39-58.15,38.39-58.15Z" fill="#7a2bd6" />
        <path d="M38.25,4.76l18.61,29.78L78.44,0h35.28l-38.39,58.15h-36.94L0,0h29.66c3.49,0,6.74,1.8,8.59,4.76Z" fill="#7a2bd6" />
      </svg>
      <span className="brand-text">CMS</span>
    </div>
  )
}
