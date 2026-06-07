# syntax=docker/dockerfile:1

# ── Build-Stufe ────────────────────────────────────────────────
# node:22 bookworm-slim läuft auf arm64 (Raspberry Pi 4/5, 64-bit OS).
FROM node:22-bookworm-slim AS builder
WORKDIR /app

# Build-Werkzeuge für evtl. native Module (sharp, libsql) auf dem Pi.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Abhängigkeiten zuerst (besseres Layer-Caching)
COPY package*.json ./
RUN npm ci

# Restlicher Code
COPY . .

# Beim Build wird die DB NICHT benötigt (alle Seiten sind dynamisch).
# Ein Platzhalter-Secret genügt, das echte kommt zur Laufzeit per ENV.
ENV NODE_ENV=production
ENV PAYLOAD_SECRET=build-time-placeholder
RUN npm run build

# ── Laufzeit-Stufe ─────────────────────────────────────────────
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates wget \
  && rm -rf /var/lib/apt/lists/*

# Nur das Nötige aus der Build-Stufe übernehmen
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src ./src

# Verzeichnisse für persistente Daten (werden per Volume gemountet)
RUN mkdir -p /app/data /app/media

EXPOSE 3000

# Einfacher Healthcheck auf die Startseite
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

# Beim Start zuerst Datenbank-Migrationen ausführen, dann Server starten.
CMD ["npm", "run", "start:prod"]
