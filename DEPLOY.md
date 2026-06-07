# Deployment auf Raspberry Pi mit Portainer

Ziel: In Portainer einen **Stack aus dem GitHub-Repo** anlegen – Portainer baut
das Image auf dem Pi und startet den Container. Updates = Repo aktualisieren +
in Portainer „Pull and redeploy".

## Voraussetzungen

- Raspberry Pi **4 oder 5** mit **64-bit OS** (Raspberry Pi OS / Ubuntu, arm64).
  *(Build braucht ~1,5 GB RAM. Bei 1-GB-Pi vorher Swap erhöhen.)*
- Docker + Portainer laufen bereits auf dem Pi.
- Das Projekt liegt in einem **GitHub-Repository** (siehe Schritt 1).

---

## Schritt 1 – Projekt zu GitHub pushen

Lokal im Projektordner (einmalig):

```bash
git init                       # falls noch nicht geschehen
git add -A
git commit -m "Initial: Orchester-Website"
git branch -M main
git remote add origin https://github.com/<DEIN-USER>/<REPO>.git
git push -u origin main
```

> `.env`, die SQLite-Datei und der `media`-Ordner sind per `.gitignore`
> ausgeschlossen – es landen **keine Geheimnisse oder lokalen Daten** auf GitHub.

---

## Schritt 2 – Ein sicheres `PAYLOAD_SECRET` erzeugen

Auf irgendeinem Rechner:

```bash
openssl rand -hex 32
```

Den ausgegebenen langen Wert kopieren – wird in Schritt 3 gebraucht.

---

## Schritt 3 – Stack in Portainer anlegen

1. Portainer öffnen → **Stacks** → **+ Add stack**.
2. Name z. B. `lso-website`.
3. Build method: **Repository**.
   - **Repository URL:** `https://github.com/<DEIN-USER>/<REPO>.git`
     *(privates Repo? → „Authentication" anhaken und Token hinterlegen.)*
   - **Repository reference:** `refs/heads/main`
   - **Compose path:** `docker-compose.yml`
4. Unter **Environment variables** → **+ add environment variable**:
   | Name | Value |
   |---|---|
   | `PAYLOAD_SECRET` | *(der Wert aus Schritt 2)* |
   | `WEB_PORT` | `3000` *(oder ein freier Port deiner Wahl)* |
5. **Deploy the stack** klicken.

Portainer klont das Repo, baut das Image (dauert auf dem Pi ein paar Minuten)
und startet den Container.

---

## Schritt 4 – Aufrufen

- Website:  `http://<pi-ip>:3000`
- Admin/Login:  `http://<pi-ip>:3000/admin`

Beim ersten Start legst du im Admin **einen Benutzer** an (zentraler Login).
Demo-Inhalte werden automatisch befüllt.

---

## Updates ausrollen

Neue Version auf GitHub gepusht? In Portainer:

**Stacks → `lso-website` → „Pull and redeploy"** (Häkchen *Re-pull image and
rebuild* aktivieren). Datenbank und Medien bleiben dank Volumes erhalten.

---

## Wichtige Hinweise

- **Daten bleiben erhalten** in den Volumes `lso_data` (Datenbank) und
  `lso_media` (Uploads). Nicht löschen, sonst ist alles weg.
- **Backup:** regelmäßig die beiden Volumes sichern (z. B. `lso_data` enthält
  `landshuter.db`). In Portainer unter *Volumes* einsehbar.
- **Von außen erreichbar machen** (eigene Domain, HTTPS): am besten einen
  Reverse-Proxy davorsetzen (Nginx Proxy Manager, Traefik oder Caddy) – der
  übernimmt TLS-Zertifikate. Dann nicht Port 3000 direkt ins Internet öffnen.
- **E-Mail** (z. B. Passwort vergessen): aktuell kein Mail-Versand konfiguriert.
  Bei Bedarf einen E-Mail-Adapter ergänzen.
- **Skalierung:** SQLite genügt für eine Vereinsseite locker. Erst bei sehr
  vielen gleichzeitigen Schreibzugriffen würde man auf Postgres wechseln.
