FROM node:20-alpine AS base

# ---- deps ----
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# node:20-alpine ships npm 10.8.2; match the lockfile's npm 11 generator.
# Use `npm install` rather than `npm ci`: several optional wasm32-wasi
# packages (@tailwindcss/oxide, @rolldown/binding, @unrs/resolver) each pin
# their own nested @emnapi/* versions, and npm's lockfile writer produces a
# graph `npm ci`'s strict self-consistency check rejects (EUSAGE) even right
# after a clean `npm install` — a known npm quirk with this dependency shape,
# not an actual package.json/package-lock.json drift.
RUN npm install -g npm@11 && npm install --no-audit --no-fund

# ---- build ----
FROM base AS builder
WORKDIR /app
# NEXT_PUBLIC_* vars are inlined at build time, so this must be passed as a
# Docker build arg (not just a runtime env var) for metadataBase to resolve
# to the right domain per environment.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- run ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
