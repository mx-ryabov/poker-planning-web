# Shared Layer

Non-business logic that can be imported **anywhere** in the project.

## What Goes Here

-   UI-kit components (Button, Modal, Input, Toast, Icon)
-   Generic hooks (useClickOutside, useLocalStorage, useMutation)
-   Utility functions (mergeClassNames, validation, stringHelper)
-   Generic TypeScript types (DeepPartial, RequiredField)
-   Logging infrastructure
-   Generic providers (ConfirmationModalProvider, CookieConsentProvider)

## What Doesn't Go Here

-   Business logic or domain models
-   Page-specific code
-   Components that depend on domain entities
-   Server actions

## Folder Structure

```
shared/
├── ui/          # UI-kit components
├── lib/         # Hooks, utils, types, logger
└── providers/   # Generic providers
```

## Documentation

See [Frontend Architectural Design](../../docs/architecture/frontend-architectural-design.md) for detailed import rules and constraints.
