# Base stage for shared dependencies
FROM node:18-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

# Development dependencies stage
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/web/package.json ./apps/web/
RUN pnpm install --frozen-lockfile

# Build stage
FROM dependencies AS builder
COPY . .
RUN pnpm build

# Production dependencies stage
FROM base AS production-deps
COPY --from=dependencies /app/package.json /app/pnpm-lock.yaml ./
COPY --from=dependencies /app/packages/shared/package.json ./packages/shared/
COPY --from=dependencies /app/apps/web/package.json ./apps/web/
RUN pnpm install --prod --frozen-lockfile

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["pnpm", "start"]