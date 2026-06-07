// Kleiner Helfer, um aus reinem Text gültigen Lexical-RichText zu erzeugen
// (für die Demo-Inhalte). Unterstützt Absätze und einfache Überschriften.

type Node = Record<string, unknown>

function textNode(text: string): Node {
  return { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }
}

function paragraph(text: string): Node {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    textFormat: 0,
    children: [textNode(text)],
  }
}

function heading(text: string, tag: 'h2' | 'h3' = 'h2'): Node {
  return {
    type: 'heading',
    tag,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [textNode(text)],
  }
}

// Eingabe: Array aus Strings (Absätze) oder ['h2', 'Titel'] für Überschriften.
export function rt(blocks: (string | ['h2' | 'h3', string])[]): any {
  const children = blocks.map((b) =>
    Array.isArray(b) ? heading(b[1], b[0]) : paragraph(b),
  )
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}
