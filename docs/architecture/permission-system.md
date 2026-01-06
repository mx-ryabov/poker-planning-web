# Permission System Architecture

## Overview

The permission system is centralized in the `domain/_utility/permissions` module and contains all the core logic related to permissions in the app. It's organized into three parts:

-   Core - contains the `permissions checker factory` that is used to create a permissions checker for a specific domain (game, admin, etc), types, and utility functions
-   Entity Permissions - each domain entity (e.g., `game`) defines its own `actions`, `definitions` (permission rules), and pre-configured checker
-   Page (React integration) - optional layer for a specific page where you can define a hook as a wrapper for the corresponding permissionsChecker function in which you can pass all the necessary params from the state.

---

## File Structure

```mermaid
graph LR
    subgraph DomainUtility["src/domain/_utility/permissions/"]
        direction TB
        Core["core/<br/>├─ checker.ts<br/>└─ types.ts"]
        Utils["utils/<br/>└─ permission-helpers.ts"]
        Index["index.ts<br/>(Public API)"]
    end

    subgraph EntityPerms["src/domain/entities/game/permissions/"]
        direction TB
        Actions["actions.ts<br/>(GameActions)"]
        Defs["definitions.ts<br/>(GAME_PERMISSIONS,<br/>checkGamePermission)"]
        Tests["game-permissions.test.ts"]
    end

    subgraph PageLayer["src/app/(game)/game/[id]/_permissions/"]
        direction TB
        GameHook["use-game-permissions.ts"]
        GameIndex["index.ts"]
    end

    Core --> Index
    Utils --> Index

    Index --> Defs
    Actions --> Defs
    Defs --> Tests

    Defs --> GameHook
    GameHook --> GameIndex

    style DomainUtility fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style EntityPerms fill:#7c2d12,stroke:#f97316,color:#fff
    style PageLayer fill:#065f46,stroke:#10b981,color:#fff
```

---

## Usage Patterns

### Pattern 1: Simple Permission Check

```mermaid
graph LR
    A["Component"] -->|"useGamePermissions(EditTicket)"| B["Hook"]
    B -->|"Gets current role"| C["State"]
    B -->|"checkGamePermission(action, {actor})"| D["Checker"]
    D -->|"true/false"| A

    style A fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style B fill:#065f46,stroke:#10b981,color:#fff
    style C fill:#7c2d12,stroke:#f97316,color:#fff
    style D fill:#4c1d95,stroke:#a78bfa,color:#fff
```

### Pattern 2: Permission with Target

```mermaid
graph LR
    A["Component"] -->|"useGamePermissions(KickParticipant, targetRole)"| B["Hook"]
    B -->|"Gets current role"| C["State"]
    B -->|"checkGamePermission(action, {actor, target})"| D["Checker"]
    D -->|"true/false"| A

    style A fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style B fill:#065f46,stroke:#10b981,color:#fff
    style C fill:#7c2d12,stroke:#f97316,color:#fff
    style D fill:#4c1d95,stroke:#a78bfa,color:#fff
```

### Pattern 3: Direct Checker Usage (Non-React)

```mermaid
graph LR
    A["Utility Function<br/>API Route<br/>Server Action"] -->|"checkGamePermission(action, {actor, target?})"| B["Checker"]
    B -->|"true/false"| A

    style A fill:#7c2d12,stroke:#f97316,color:#fff
    style B fill:#4c1d95,stroke:#a78bfa,color:#fff
```

---

## Extension Example: Adding Admin Permissions

### Step 1: Define Actions in Entity

```typescript
// src/domain/entities/admin/permissions/actions.ts
export const AdminActions = {
	ManageUsers: "admin:manage-users",
	ViewAnalytics: "admin:view-analytics",
	EditSettings: "admin:edit-settings",
} as const;

export type AdminActionType = (typeof AdminActions)[keyof typeof AdminActions];
```

### Step 2: Define Permissions and Create Checker

```typescript
// src/domain/entities/admin/permissions/definitions.ts
import {
	createPermissionChecker,
	createSimplePermission,
	PermissionMap,
} from "@/src/domain/_utility/permissions";
import { AdminRole } from "../models/admin-role";
import { AdminActions, AdminActionType } from "./actions";

const ADMIN_PERMISSIONS: PermissionMap<AdminActionType, AdminRole> = {
	[AdminActions.ManageUsers]: createSimplePermission([
		AdminRole.SuperAdmin,
		AdminRole.Admin,
	]),
	[AdminActions.ViewAnalytics]: createSimplePermission([
		AdminRole.SuperAdmin,
		AdminRole.Admin,
		AdminRole.Analyst,
	]),
	// ...
};

/**
 * Pre-configured permission checker for admin permissions.
 */
export const checkAdminPermission = createPermissionChecker<
	AdminRole,
	AdminActionType
>(ADMIN_PERMISSIONS);
```

### Step 3: Export from Entity Index

```typescript
// src/domain/entities/admin/index.ts
export * from "./permissions/definitions";
export { AdminActions, type AdminActionType } from "./permissions/actions";
```

### Step 4: Create Page Hook

```typescript
// src/app/admin/_permissions/use-admin-permissions.ts
import { useMemo } from "react";
import {
	AdminActionType,
	checkAdminPermission,
} from "@/src/domain/entities/admin";
import { AdminRole } from "@/src/domain/entities/admin";
import { selectCurrentRole, useAdminState } from "../_store";

export function useAdminPermissions(
	action: AdminActionType,
	targetRole?: AdminRole,
): boolean {
	const currentRole = useAdminState(selectCurrentRole);
	return useMemo(
		() =>
			checkAdminPermission(action, {
				actor: currentRole,
				target: targetRole,
			}),
		[currentRole, action, targetRole],
	);
}
```

### Step 5: Write Tests (Co-located with Definitions)

```typescript
// src/domain/entities/admin/permissions/admin-permissions.test.ts
import { describe, expect, test } from "vitest";
import { AdminRole } from "../models/admin-role";
import { checkAdminPermission } from "./definitions";
import { AdminActions } from "./actions";

describe("Admin Permissions", () => {
	test.each([
		{ role: AdminRole.SuperAdmin, expectedResult: true },
		{ role: AdminRole.Admin, expectedResult: true },
		{ role: AdminRole.Analyst, expectedResult: false },
	])(
		"ManageUsers: SuperAdmin and Admin are allowed - role: $role",
		({ role, expectedResult }) => {
			const result = checkAdminPermission(AdminActions.ManageUsers, {
				actor: role,
			});
			expect(result).toBe(expectedResult);
		},
	);
});
```

---

## Decision Flow: When to Use Each Layer

```mermaid
flowchart TD
    Start{{"Need to check<br/>permissions?"}}

    InReact{{"In React<br/>component?"}}
    HasContext{{"Have role<br/>in context?"}}

    UseHook["Use useGamePermissions<br/>(or other domain hook)"]
    UseChecker["Use checkGamePermission<br/>(or other domain checker)"]
    CreateNew["Create new hook<br/>wrapping checker"]

    Start --> InReact

    InReact -->|Yes| HasContext
    InReact -->|No| UseChecker

    HasContext -->|Yes| UseHook
    HasContext -->|No| CreateNew

    style UseHook fill:#065f46,stroke:#10b981,color:#fff
    style UseChecker fill:#1e3a8a,stroke:#3b82f6,color:#fff
    style CreateNew fill:#7c2d12,stroke:#f97316,color:#fff
```

---

## Summary

### File Locations

-   **Core Logic**: `src/domain/_utility/permissions/`
    -   `core/checker.ts` - Factory function
    -   `core/types.ts` - Permission types
    -   `utils/permission-helpers.ts` - Utility functions (e.g., `createSimplePermission`)
-   **Entity Permissions**: `src/domain/entities/{entity}/permissions/`
    -   `actions.ts` - Action type definitions
    -   `definitions.ts` - Permission definitions and pre-configured checker
    -   `{entity}-permissions.test.ts` - Permission tests
-   **React Hooks**: `src/app/{route}/_permissions/`
    -   `use-{domain}-permissions.ts` - Domain-specific hook

### Quick Reference

```typescript
// 1. Pre-configured checker (from entity)
import { checkGamePermission } from "@/src/domain/entities/game";

// 2. Use in React components
import { useGamePermissions, GameActions } from "./_permissions";

const canEdit = useGamePermissions(GameActions.EditTicket);
const canKick = useGamePermissions(GameActions.KickParticipant, targetRole);

// 3. Use outside React (utility functions, API routes, etc.)
import { checkGamePermission, GameActions } from "@/src/domain/entities/game";

if (checkGamePermission(GameActions.EditTicket, { actor: role })) {
	// User is allowed to edit
}
```
