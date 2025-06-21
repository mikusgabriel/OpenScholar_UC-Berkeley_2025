FROM oven/bun:1.1.4

WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", "x", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]