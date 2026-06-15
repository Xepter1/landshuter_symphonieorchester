import React from 'react'

// Saubere kleine Bildmarke (X, nur die lila Pfeile – kein Dreieck-Artefakt).
// Lila ist auf hellem wie dunklem Grund gut sichtbar.
export default function Icon() {
  return (
    <svg
      viewBox="0 0 113.72 128.84"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Xepter"
      style={{ height: '22px', width: 'auto' }}
    >
      <path d="M38.39,70.69h26.77l6.68,5.08-36.56,53.07H0s38.39-58.15,38.39-58.15Z" fill="#7a2bd6" />
      <path d="M38.25,4.76l18.61,29.78L78.44,0h35.28l-38.39,58.15h-36.94L0,0h29.66c3.49,0,6.74,1.8,8.59,4.76Z" fill="#7a2bd6" />
    </svg>
  )
}
