# Domain Layer

Shareable **business logic** that can be imported in `app/`, infrastructure files, and tests.

## What Goes Here

- Business models and TypeScript interfaces
- Zod/validation schemas
- Server actions
- Permission definitions
- Shared business state (across multiple pages)
- Business-specific UI components (shared across pages)
- Business providers (API, auth)
- Internal utilities (`_utility/`)

## What Doesn't Go Here

- Generic UI components (use `shared/ui`)
- Page-specific code (co-locate with the page in `app/`)
- Non-business utilities (use `shared/lib`)

## Folder Structure

```
domain/
├── entities/    # Business models, schemas, actions, permissions
├── state/       # Shared business state
├── ui/          # Shared business-specific UI components
├── providers/   # Business providers
└── _utility/    # Internal utilities (not public API)
```

## Import Rules

- `entities/` → foundation, can be imported anywhere in domain and app
- `state/` → can be imported by ui/, providers/, and app
- `ui/`, `providers/` → exit points, can only be imported in app (not within domain)
- `_utility/` → internal, can be imported within domain only

## Documentation

See [Frontend Architectural Design](../../docs/architecture/frontend-architectural-design.md) for detailed import rules and constraints.

