# ---------- build stage ----------
FROM oven/bun:1.1.4 AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile          

COPY . .
RUN bun run build                     

FROM oven/bun:1.1.4 AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 3000
CMD ["bun", "run", "preview"]