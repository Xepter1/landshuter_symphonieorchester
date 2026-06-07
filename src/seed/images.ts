import type { Payload } from 'payload'
import sharp from 'sharp'

// Erzeugt ein schlichtes Platzhalter-Bild (Farbverlauf + Beschriftung) und
// legt es als Medium an. So sieht die Galerie/Hero sofort „lebendig" aus –
// die Bilder tauscht der Verein später 1:1 gegen echte Fotos.
export async function makePlaceholder(
  payload: Payload,
  opts: { name: string; label: string; from: string; to: string; width?: number; height?: number },
): Promise<number> {
  const w = opts.width ?? 1200
  const h = opts.height ?? 900
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${opts.from}"/>
        <stop offset="100%" stop-color="${opts.to}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <text x="50%" y="50%" fill="rgba(255,255,255,0.92)" font-family="Georgia, serif"
      font-size="${Math.round(w / 16)}" font-weight="bold" text-anchor="middle" dominant-baseline="middle">${esc(opts.label)}</text>
    <text x="50%" y="${h - 36}" fill="rgba(255,255,255,0.55)" font-family="Arial, sans-serif"
      font-size="22" text-anchor="middle">Platzhalter – später durch echtes Foto ersetzen</text>
  </svg>`

  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toBuffer()

  const doc = await payload.create({
    collection: 'media',
    data: { alt: opts.label },
    file: { data: buffer, mimetype: 'image/jpeg', name: opts.name, size: buffer.length },
  })
  return doc.id as number
}
