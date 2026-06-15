import React from 'react'

// Xepter-Wortmarke oben links über der Navigation, theme-abhängig.
const css = `
.xepter-nav img { height: 26px; width: auto; max-width: 190px; }
.xepter-nav .x-light { display: none; }
.xepter-nav .x-dark { display: block; }
[data-theme='dark'] .xepter-nav .x-dark { display: none; }
[data-theme='dark'] .xepter-nav .x-light { display: block; }
`

export default function Icon() {
  return (
    <span className="xepter-nav">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <img className="x-dark" src="/brand/xepter-logo-dark.svg" alt="Xepter" />
      <img className="x-light" src="/brand/xepter-logo-light.svg" alt="Xepter" />
    </span>
  )
}
