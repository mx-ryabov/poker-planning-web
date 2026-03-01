FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app


FROM base AS pruner
RUN pnpm install -g turbo@^2
COPY . .

RUN turbo prune @poker-planning/frontend --docker


FROM base AS installer
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .


WORKDIR /app/apps/frontend
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM
# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm turbo build


FROM base AS runner
ENV NODE_ENV=production

RUN groupadd -g 1001 nodejs
RUN useradd -u 1001 -g nodejs -s /bin/bash nextjs

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "apps/frontend/server.js"]