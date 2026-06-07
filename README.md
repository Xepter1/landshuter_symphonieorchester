# Landshuter Symphonieorchester – Website

Selbst pflegbare Website für ein Orchester. Ein technischer Aufbau, danach
ohne Programmierkenntnisse über ein zentrales Login zu pflegen.

**Stack:** [Next.js](https://nextjs.org) (Frontend) + [Payload CMS](https://payloadcms.com)
(Admin/Login/Inhalte) + SQLite (Datenbank). Ein Repo, ein Deploy, ein Login.

---

## Schnellstart (lokal)

```bash
npm install
npm run dev
```

- **Website:** http://localhost:3000
- **Admin / Login:** http://localhost:3000/admin

Beim **ersten Start** legt das System automatisch Demo-Inhalte an (Konzerte,
Neuigkeiten, Mitwirkende, Texte), damit man das Design sofort sieht. Im Admin
wird einmalig ein Benutzer angelegt – das ist der zentrale Login-Zugang.

> Datenbank zurücksetzen (neu seeden): Datei `landshuter.db` löschen und Server neu starten.

---

## Was kann im Admin gepflegt werden?

Unter **Inhalte**:
- **Konzerte / Termine** – mit Datum, Ort, Programm, Mitwirkenden, Flyer (PDF/Bild),
  Fotogalerie und Ticket-Link. Vergangene Termine landen automatisch im **Archiv**.
- **Neuigkeiten** – Ankündigungen mit Bild und Text.
- **Mitwirkende** – feste Mitglieder und wechselnde Solist:innen / Projektbeteiligte.
- **Seiten** – flexible Textseiten wie „Über uns" (URL: `/seite/<kürzel>`).
- **Medien** – zentrale Bibliothek für Bilder und PDFs.

Unter **Verwaltung**:
- **Einstellungen** – Orchestername, Startseiten-Text, Kontaktdaten, Impressum.
- **Benutzer** – Login-Zugänge.

---

## Seiten der Website

| Seite | URL |
|---|---|
| Startseite | `/` |
| Konzerte & Termine (inkl. Archiv) | `/konzerte` |
| Über uns | `/seite/ueber-uns` |
| Mitwirkende | `/mitwirkende` |
| Neuigkeiten | `/news` |
| Kontakt | `/kontakt` |
| Impressum | `/impressum` |

---

## Nützliche Befehle

```bash
npm run dev                 # Entwicklungsserver
npm run build               # Produktions-Build
npm run start               # Produktions-Server (nach build)
npm run generate:types      # TypeScript-Typen aus dem Datenmodell erzeugen
npm run generate:importmap  # Admin-Importmap neu erzeugen (nach Feld-Änderungen)
```

---

## Produktion / Deployment (Ausblick)

- **Datenbank:** SQLite (Datei) genügt für kleine Seiten. Für komfortables Hosting
  (z. B. Vercel) auf Postgres umstellen – im Code nur den DB-Adapter in
  `src/payload.config.ts` tauschen.
- **Medien:** Lokaler `media`-Ordner. Bei serverlosem Hosting auf einen
  Speicher (S3 / Vercel Blob) umstellen.
- **E-Mail:** Für Passwort-Zurücksetzen einen E-Mail-Adapter ergänzen.
- **Umgebungsvariablen:** `PAYLOAD_SECRET` (sicher!) und `DATABASE_URI` setzen –
  Vorlage siehe `.env.example`.

---

## Projektstruktur

```
src/
  collections/   Datenmodelle (Events, News, Members, Pages, Media, Users)
  globals/       Einstellungen (Settings)
  app/(frontend) Öffentliche Website
  app/(payload)  Admin-Panel (automatisch generiert)
  components/    Header, Footer, RichText
  lib/           Payload-Zugriff & Formatierung
  seed/          Demo-Inhalte für den ersten Start
```
