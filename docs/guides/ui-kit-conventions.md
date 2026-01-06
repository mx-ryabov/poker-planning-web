# UI Kit Conventions

This guide documents the conventions and patterns used in the UI kit located at `src/shared/ui/`.

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Naming Conventions](#naming-conventions)
3. [File Organization](#file-organization)
4. [Styling Patterns](#styling-patterns)
5. [Testing](#testing)
6. [Storybook](#storybook)
7. [Exports](#exports)

---

## Folder Structure

```
src/shared/ui/
├── components/           # UI components
│   ├── button/
│   ├── input/
│   └── ...
├── next-components/      # Next.js-specific components (Link, etc.)
├── styles/               # Shared style utilities
├── colors.ts             # Color definitions
└── __docs__/             # Internal documentation
```

## Naming Conventions

### Folders

-   Use **kebab-case** for folder names
-   Folder name should match the component name: `button/`, `inline-edit/`

### Files

| File Type      | Convention                | Example                           |
| -------------- | ------------------------- | --------------------------------- |
| Main component | `{folder-name}.tsx`       | `button/button.tsx`               |
| Test file      | `{folder-name}.test.tsx`  | `button/button.test.tsx`          |
| Barrel export  | `index.ts`                | `button/index.ts`                 |
| Styles         | `{folder-name}.styles.ts` | `drawer/drawer-content.styles.ts` |
| Types          | `types.ts`                | `icon/types.ts`                   |

### Components

-   Use **PascalCase** for component names: `Button`, `InlineEdit`
-   Use **PascalCase** for type/interface names: `ButtonProps`, `InputProps`

### Sub-components

For components with internal sub-components:

```
drawer/
├── drawer.tsx              # Main component
├── components/
│   ├── drawer-content.tsx
│   ├── drawer-heading.tsx
│   └── drawer-trigger.tsx
└── index.ts
```

---

## File Organization

### Standard Component Structure

```
component-name/
├── component-name.tsx       # Main component implementation
├── component-name.test.tsx  # Unit tests
├── index.ts                 # Barrel export
├── components/              # Sub-components (optional)
├── hooks/                   # Component-specific hooks (optional)
├── contexts/                # Context providers (optional)
└── utils/                   # Utilities (optional)
```

### Simple Component Example

```
button/
├── button.tsx
├── button.test.tsx
└── index.ts
```

### Complex Component Example

```
autocomplete/
├── autocomplete.tsx
├── autocomplete.test.tsx
├── index.ts
├── components/
│   ├── autocomplete-list.tsx
│   ├── autocomplete-list-option.tsx
│   └── autocomplete-value.tsx
├── contexts/
│   ├── autocomplete-list-context.ts
│   └── autocomplete-value-context.ts
└── hooks/
    ├── use-autocomplete.tsx
    ├── use-autocomplete-state.ts
    └── use-autocomplete-value.ts
```

---

## Component Architecture

### Separation of Behavior and State

Following the React Aria/Stately approach, complex components should separate concerns into:

| Layer              | Purpose                          | Example                                  |
| ------------------ | -------------------------------- | ---------------------------------------- |
| **State hooks**    | Manage component state logic     | `useSelectState`, `useAutocompleteState` |
| **Behavior hooks** | Handle interactions, ARIA, focus | `useSelect`, `useAutocomplete`           |
| **Component**      | Render UI with styles            | `Select`, `Autocomplete`                 |

### When to Use This Pattern

Use separated hooks when building complex interactive components that need:

-   Custom keyboard navigation
-   Focus management
-   ARIA attributes
-   Complex state logic (selections, open/close, etc.)

### Example Structure

```
select/
├── select.tsx                    # Main component (composition)
├── hooks/
│   ├── use-select-state.ts       # State management (React Stately pattern)
│   └── use-select.ts             # Behavior/interaction (React Aria pattern)
├── components/
│   ├── select-trigger.tsx
│   └── select-popover.tsx
└── index.ts
```

### Implementation Pattern

```typescript
// use-select-state.ts — Pure state logic
export function useSelectState(props: SelectStateProps) {
	const [selectedKey, setSelectedKey] = useState(props.defaultSelectedKey);
	const [isOpen, setIsOpen] = useState(false);
	// ... state logic only, no DOM/ARIA concerns
	return { selectedKey, setSelectedKey, isOpen, open, close };
}

// use-select.ts — Behavior/interaction layer
export function useSelect(props: SelectProps, state: SelectState, ref: RefObject<HTMLElement>) {
	// Keyboard handlers, focus management, ARIA attributes
	const { keyboardProps } = useKeyboard({ ... });
	const { focusProps } = useFocusRing();

	return {
		triggerProps: { ...keyboardProps, ...focusProps, 'aria-expanded': state.isOpen },
		// ...
	};
}

// select.tsx — Composition
export function Select(props: SelectProps) {
	const ref = useRef(null);
	const state = useSelectState(props);
	const { triggerProps, listBoxProps } = useSelect(props, state, ref);

	return (
		<button ref={ref} {...triggerProps}>
			{/* ... */}
		</button>
	);
}
```

### Benefits

-   **Testability** — State logic can be unit tested in isolation
-   **Reusability** — Hooks can be reused across different UI implementations
-   **Flexibility** — Easy to customize behavior without touching state logic
-   **Debugging** — Clear separation makes issues easier to locate

### When NOT to Use

For simple components (Button, Avatar, Chip), this pattern adds unnecessary complexity. Use it only when the component has:

-   Multiple interactive states
-   Complex keyboard interactions
-   Focus management requirements
-   Accessibility concerns beyond basic ARIA

---

## Styling Patterns

### Class Variance Authority (CVA)

Use CVA for variant-based styling:

```typescript
import { cva } from "class-variance-authority";

const buttonStyles = cva("base-classes", {
	variants: {
		size: {
			small: "h-8 px-3 text-sm",
			medium: "h-10 px-4 text-base",
			large: "h-14 px-6 text-lg",
		},
		variant: {
			default: "bg-primary-500 text-white",
			outline: "border border-primary-500 text-primary-500",
			ghost: "text-primary-500 hover:bg-primary-50",
		},
	},
	defaultVariants: {
		size: "medium",
		variant: "default",
	},
});
```

### Tailwind Merge

Use `tailwind-merge` to handle className conflicts:

```typescript
import { twMerge } from "tailwind-merge";

<button className={twMerge(buttonStyles({ size, variant }), className)} />;
```

### Shared Styles

Put reusable styles in `src/shared/ui/styles/`:

```typescript
// styles/button.styles.ts
export const buttonStyles = cva(/* ... */);
export type ButtonStylesProps = VariantProps<typeof buttonStyles>;
```

---

## Testing

### Test File Location

Tests are colocated with components:

```
button/
├── button.tsx
├── button.test.tsx  # ← Here
└── index.ts
```

### Test Imports

Import from the component file directly in tests:

```typescript
// button.test.tsx
import { Button } from "./button";
```

### Required Tests

Every component should have at minimum:

```typescript
import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";

describe("ComponentName", () => {
    test("renders successfully", () => {
        const { container } = render(<Component />);
        expect(container).toBeInTheDocument();
    });

    test("doesn't violate any accessibility rules", async () => {
        const { container } = render(<Component />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
```

See `src/shared/ui/__docs__/TESTING.md` for detailed testing rules.

---

## Storybook

### Story Location

Stories are in a separate folder:

```
stories/
└── shared/
    ├── Button.stories.tsx
    ├── Input.stories.tsx
    └── ...
```

### Story Structure

```typescript
import { Button } from "@/src/shared/ui/components/button";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
	title: "Shared/Button",
	component: Button,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { children: "Button" },
};
```

### Running Storybook

```bash
pnpm storybook        # Development
pnpm build-storybook  # Build
pnpm test-storybook   # Run interaction tests
```

---

## Exports

### Barrel Exports (index.ts)

Always use barrel exports:

```typescript
// index.ts
"use client";
export { Button } from "./button";
```

### What to Export

-   ✅ Component
-   ✅ Props types (if needed externally)
-   ❌ Internal utilities
-   ❌ Internal hooks (unless designed for reuse)

### "use client" Directive

Add `"use client"` at the top of `index.ts` for client-side components:

```typescript
"use client";
export { Button } from "./button";
```

---

## Creating a New Component

### Checklist

1. [ ] Create folder with kebab-case name
2. [ ] Create main component file matching folder name
3. [ ] Create `index.ts` barrel export
4. [ ] Add basic tests with accessibility check
5. [ ] Add Storybook story
6. [ ] Export from parent barrel (if applicable)

### Template

```bash
# Create folder structure
mkdir -p src/shared/ui/components/my-component
```

```typescript
// my-component.tsx
"use client";

type MyComponentProps = {
    children: React.ReactNode;
};

export function MyComponent({ children }: MyComponentProps) {
    return <div>{children}</div>;
}
```

```typescript
// index.ts
"use client";
export { MyComponent } from "./my-component";
```

```typescript
// my-component.test.tsx
import { test, describe, expect } from "vitest";
import { render } from "@/test/utilities";
import { axe } from "jest-axe";
import { MyComponent } from "./my-component";

describe("MyComponent", () => {
    test("renders successfully", () => {
        render(<MyComponent>Content</MyComponent>);
    });

    test("doesn't violate any accessibility rules", async () => {
        const { container } = render(<MyComponent>Content</MyComponent>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
```

---

## Related Documentation

-   [ADR-003: UI Kit Choice](../adr/003-ui-kit.md) — Architecture decision
-   [Testing Rules](../../src/shared/ui/__docs__/TESTING.md) — Detailed testing guidelines
-   [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/) — Base library docs
