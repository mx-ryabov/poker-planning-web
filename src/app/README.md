# App Layer

**Next.js App Router** pages with co-located page-specific code.

## What Goes Here

-   Page components (`page.tsx`, `layout.tsx`)
-   Page-specific UI components (`_components/`)
-   Page-specific state and hooks (`_state/`)
-   Page-specific stores (`_store/`)
-   Page-specific event handlers (`_events/`)
-   Page-specific permission hooks (`_permissions/`)
-   Route groups and nested routes

## What Doesn't Go Here

-   Reusable business logic (move to `domain/`)
-   Generic UI components (use `shared/ui`)
-   Code that needs to be imported by other pages (move to `domain/`)

## Page Structure

Each page may have private folders (prefixed with `_`):

```
(route)/
├── _components/   # Page-specific UI
├── _state/        # Page-specific state and hooks
├── _store/        # Page-specific stores (Zustand, etc.)
├── _events/       # Page-specific event handlers
├── _permissions/  # Page-specific permission checks
├── page.tsx
└── layout.tsx
```

## Import Rules

-   **Cannot be imported** by code outside of `app/` (except tests)
-   **Internal imports** within `app/` are allowed
-   **Can import** from `shared/` and `domain/`

## Documentation

See [Frontend Architectural Design](../../docs/architecture/frontend-architectural-design.md) for detailed import rules and constraints.
