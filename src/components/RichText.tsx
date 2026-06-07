import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

// Rendert von Payload (Lexical) gespeicherten Rich-Text als HTML.
export function RichText({
  data,
  className = 'prose',
}: {
  data?: SerializedEditorState | null
  className?: string
}) {
  if (!data) return null
  return <LexicalRichText data={data} className={className} />
}
