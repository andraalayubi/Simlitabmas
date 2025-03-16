# Stage 1 - Build
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY .env .env

RUN npm install

RUN npm install --arch=arm64 --platform=linuxmusl sharp

COPY . .

RUN npx prisma generate

RUN npm run build

# Stage 2 - Production
FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# COPY --from=builder . .

EXPOSE 3000
CMD ["npm", "start"]