import React from 'react'

// Logo auf dem Login-Screen des Admin-Panels (Xepter, Text-Version).
// Reine Optik – ändert nichts an der Funktion des Backends.
export default function Logo() {
  return (
    <img
      src="/brand/xepter-logo.svg"
      alt="Xepter"
      style={{ width: '100%', maxWidth: '220px', height: 'auto' }}
    />
  )
}
