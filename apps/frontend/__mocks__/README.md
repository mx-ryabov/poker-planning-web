# Mocks Directory

This directory contains all mocks and mock generators used for testing in the project.

## Location

**Important:** This `__mocks__` directory must be located at the **project root** (the same level as `vitest.config.ts`). This is required for Vitest to properly discover and use the mocks during test execution.

## Purpose

This directory serves as a centralized location for:

-   **Mock providers**: React context providers that provide fake implementations for testing (e.g., `api-fake-provider.tsx`, `app-fake-provider.tsx`)
-   **Browser API mocks**: Mock implementations of browser APIs that may not be available in the test environment (e.g., `intersection-observer.ts`, `resize-observer.ts`)
-   **Library mocks**: Mock implementations of third-party libraries (e.g., `zustand.ts`)
-   **Mock generators**: Factory functions that generate test data for domain entities (e.g., `game/generators.ts`)
-   **Common mock utilities**: Shared mock utilities and error responses used across tests

## Usage

Mocks are automatically loaded by Vitest through the test setup file (`test/setup.ts`). For example:

```typescript
// test/setup.ts automatically imports:
import "@/__mocks__/intersection-observer";
import "@/__mocks__/resize-observer";
```

Mock generators can be imported in test files:

```typescript
import { generateGame, generateParticipant } from "@/__mocks__/game";
```

## Future Considerations

**Note:** The current decision to store all mocks and mock generators in this centralized location may change in the future. An alternative approach being considered is to **co-locate mock generators** with their corresponding pages or domains (e.g., placing game mock generators near the game domain code). This would improve discoverability and maintainability as the codebase grows.

If this decision changes, this README will be updated to reflect the new structure and migration path.
