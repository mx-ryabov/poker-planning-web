# Poker Planning - Frontend

Next.js 16 application for the Poker Planning real-time collaborative tool.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **UI Components**: React Aria / React Aria Components
- **State Management**: Zustand
- **Styling**: CVA + Tailwind CSS v4
- **Real-time**: SignalR (@microsoft/signalr)
- **Testing**: Vitest, Testing Library, Playwright
- **Documentation**: Storybook

## Architecture

This application follows a **three-layer architecture**:

```
shared → domain → app
```

See [Frontend Architectural Design](../../docs/architecture/frontend-architectural-design.md) for full details.

## Development

```bash
# Start development server
pnpm dev

# Start with HTTPS (for testing)
pnpm dev-https

# Run tests
pnpm test

# Run tests with coverage
pnpm coverage

# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:deps

# Storybook
pnpm storybook

# E2E tests
pnpm test:e2e
```

## Project Structure

```
src/
├── shared/       # UI kit, hooks, utils, generic providers
├── domain/       # Business logic (entities, state, providers)
└── app/          # Next.js routes with co-located components
```

## Rules and Guidelines

- Import rules enforced by dependency-cruiser
- See `.cursor/rules/` for AI collaboration guidelines
- See `docs/` for architecture decisions and guides

## Testing Philosophy

- Unit tests co-located with components
- E2E tests in `e2e/` directory
- See testing rules for detailed conventions
