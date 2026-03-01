# Frontend Docker Build Guide

This document explains how the frontend Docker build is optimized for the monorepo structure using Turborepo's `turbo prune`.

## Overview

The Dockerfile uses a multi-stage build process with `turbo prune` to create an optimized Docker image that:

1. ✅ **Only installs necessary dependencies** - pruned lockfile prevents installing unrelated packages
2. ✅ **Maximizes Docker layer caching** - separates dependency installation from source code
3. ✅ **Minimizes rebuild triggers** - changes to other apps won't trigger frontend rebuilds
4. ✅ **Reduces image size** - uses Next.js standalone output mode

## Build Stages

### 1. Pruner Stage

```dockerfile
FROM base AS pruner
RUN pnpm install -g turbo@^2
COPY . .
RUN turbo prune @poker-planning/frontend --docker
```

This creates a pruned version of the monorepo containing:

-   `/out/json/` - Only package.json files needed for installation
-   `/out/full/` - Full source code for the frontend and its dependencies
-   `/out/pnpm-lock.yaml` - Pruned lockfile with only relevant dependencies

### 2. Installer Stage

```dockerfile
FROM base AS installer
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
```

Installs dependencies using the pruned lockfile. This layer is cached and only invalidates when:

-   Frontend dependencies change in `apps/frontend/package.json`
-   Shared dependencies used by frontend change
-   Root workspace configuration changes

**Does NOT invalidate when:**

-   Backend dependencies change
-   Other unrelated apps change
-   Source code changes

### 3. Builder Stage

```dockerfile
FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build
```

Builds the application using installed dependencies and source files.

### 4. Runner Stage

```dockerfile
FROM base AS runner
COPY --from=builder /app/apps/frontend/.next/standalone ./
COPY --from=builder /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
CMD ["node", "apps/frontend/server.js"]
```

Creates the minimal production image with only the standalone output.

## Building Locally

### From Monorepo Root

```bash
# Build the image
docker build -f ./apps/frontend/Dockerfile -t poker-planning-web .

# Run the container
docker run -p 3000:3000 --env-file ./apps/frontend/.env poker-planning-web
```

### Using Docker Compose

```bash
# Build and run both frontend and backend
docker-compose up --build

# Or just frontend
docker-compose up --build frontend
```

## Remote Caching (Optional)

To enable Turborepo remote caching during Docker builds, uncomment these lines in the Dockerfile:

```dockerfile
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN
```

Then build with:

```bash
docker build \
  -f ./apps/frontend/Dockerfile \
  --build-arg TURBO_TEAM="your-team-name" \
  --build-arg TURBO_TOKEN="your-token" \
  -t poker-planning-web .
```

**Note:** Remote caching speeds up builds by reusing build artifacts from previous builds or CI/CD.

## Troubleshooting

### Build fails with "turbo: command not found"

Make sure turbo is installed globally in the pruner stage. Check the Dockerfile has:

```dockerfile
RUN pnpm install -g turbo@^2
```

### "Cannot find module" errors at runtime

Ensure Next.js config has standalone output mode enabled:

```javascript
output: "standalone";
```

### Dependencies not found during build

Verify the package name in `turbo prune` matches the name in `apps/frontend/package.json`:

```dockerfile
RUN turbo prune @poker-planning/frontend --docker
```

### Windows symlink issues

If building on Windows with standalone output fails, you may need to temporarily disable standalone mode or build inside WSL2.

## References

-   [Turborepo Docker Guide](https://turborepo.dev/docs/guides/tools/docker)
-   [Next.js Standalone Output](https://nextjs.org/docs/advanced-features/output-file-tracing)
-   [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
