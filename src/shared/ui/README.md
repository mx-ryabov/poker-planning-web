# UI Kit

Custom UI component library built on React Aria Components.

## Quick Start

```typescript
import { Button } from "@/src/shared/ui/components/button";
import { Input } from "@/src/shared/ui/components/input";
import { Select } from "@/src/shared/ui/components/select";
```

## Stack

| Library                                                               | Purpose                         |
| --------------------------------------------------------------------- | ------------------------------- |
| [React Aria Components](https://react-spectrum.adobe.com/react-aria/) | Accessible component primitives |
| [Tailwind CSS](https://tailwindcss.com/)                              | Styling                         |
| [CVA](https://cva.style/docs)                                         | Variant-based styles            |

## Structure

```
ui/
├── components/        # All UI components
├── next-components/   # Next.js-specific (Link, Stream)
├── styles/            # Shared style utilities
└── colors.ts          # Color tokens
```

## Available Components

### Form Controls

-   `Button` — Primary action buttons with variants
-   `Input` — Text input with label and validation
-   `TextArea` — Multi-line text input
-   `Select` — Single/multi-select dropdown
-   `Switch` — Toggle switch
-   `RadioGroup` — Radio button group
-   `Autocomplete` — Searchable select with filtering

### Feedback

-   `Toast` — Notification toasts
-   `Modal` — Dialog modals
-   `Popover` — Floating content
-   `Tooltip` — Hover tooltips

### Layout

-   `Drawer` — Side panel drawers
-   `Separator` — Visual dividers
-   `ScrollShadow` — Scroll overflow indicators

### Data Display

-   `Avatar` — User avatars
-   `Chip` — Tags and chips
-   `List` — Interactive lists
-   `Menu` — Dropdown menus

### Editing

-   `InlineEdit` — Click-to-edit text
-   `InlineEditableTextField` — Inline text field
-   `InlineEditableTextarea` — Inline textarea

### Utility

-   `ErrorBoundary` — Error boundary wrapper
-   `Highlighter` — Text highlighting
-   `Link` — Styled anchor links

## Conventions

### File Naming

```
button/
├── button.tsx        # Component (matches folder name)
├── button.test.tsx   # Tests
└── index.ts          # Barrel export
```

### Import Pattern

Always import from the barrel:

```typescript
// ✅ Good
import { Button } from "@/src/shared/ui/components/button";

// ❌ Bad
import { Button } from "@/src/shared/ui/components/button/button";
```

## Documentation

-   📖 [Conventions Guide](../../docs/guides/ui-kit-conventions.md)
-   📋 [ADR-003: UI Kit Choice](../../docs/adr/003-ui-kit.md)
-   🧪 [Testing Rules](./__docs__/TESTING.md)
-   📚 [Storybook](http://localhost:6006) — `pnpm storybook`

## Development

```bash
# Run Storybook
pnpm storybook

# Run Storybook a11y tests
pnpm test-storybook

# Run tests
pnpm test

# Type check
pnpm type-check
```
