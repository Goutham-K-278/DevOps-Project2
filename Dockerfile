# ---------- Stage 1: Install Dependencies ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ---------- Stage 2: Production Image ----------
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "src/server.js"]
