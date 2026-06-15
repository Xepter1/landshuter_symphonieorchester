import React from 'react'

// Logo auf dem Login-Screen (Xepter-Wortmarke), theme-abhängig:
// heller Modus -> dunkles Logo, dunkler Modus -> helles Logo. Nur Optik.
const css = `
.xepter-login { display: flex; justify-content: center; }
.xepter-login img { width: 100%; max-width: 220px; height: auto; }
.xepter-login .x-light { display: none; }
.xepter-login .x-dark { display: block; }
[data-theme='dark'] .xepter-login .x-dark { display: none; }
[data-theme='dark'] .xepter-login .x-light { display: block; }
`

export default function Logo() {
  return (
    <span className="xepter-login">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <img className="x-dark" src="/brand/xepter-logo-dark.svg" alt="Xepter" />
      <img className="x-light" src="/brand/xepter-logo-light.svg" alt="Xepter" />
    </span>
  )
}
