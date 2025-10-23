---
created: 2025-10-23T10:11:17Z
last_updated: 2025-10-23T10:11:17Z
version: 1.0
author: Claude Code PM System
---

# Project Style Guide

## Overview

This style guide establishes coding standards, conventions, and best practices for the ccpm-testing project. Following these guidelines ensures consistency, maintainability, and quality across the codebase.

## TypeScript Conventions

### Type Definitions

**✅ DO:**
```typescript
// Use type imports
import type { Metadata } from "next";

// Define explicit interfaces for props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Use Readonly for immutable props
interface LayoutProps {
  children: Readonly<React.ReactNode>;
}

// Export types when needed by other modules
export type { ButtonProps };
```

**❌ DON'T:**
```typescript
// Don't use 'any'
function process(data: any) { }

// Don't skip type definitions
function Component(props) { }

// Don't use 'Function' type
const handler: Function = () => {};
```

### Naming Conventions

- **Interfaces/Types:** PascalCase (e.g., `UserProfile`, `ApiResponse`)
- **Type Aliases:** PascalCase (e.g., `ComponentProps`, `ThemeConfig`)
- **Enums:** PascalCase for name, UPPER_SNAKE_CASE for values
- **Generics:** Single capital letter or PascalCase (e.g., `T`, `TData`, `TResponse`)

### Type Safety

**Strict Mode Settings (tsconfig.json):**
```json
{
  "strict": true,
  "noEmit": true,
  "skipLibCheck": true
}
```

**✅ DO:**
```typescript
// Prefer type inference when obvious
const count = 5;
const items = ['a', 'b', 'c'];

// Be explicit when not obvious
const response: ApiResponse = await fetch();

// Use const assertions for literals
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} as const;
```

## React Conventions

### Component Structure

**✅ Preferred Pattern:**
```typescript
// File: src/components/Button.tsx
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  onClick
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}
```

### Component Naming

- **Component Files:** PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Component Functions:** PascalCase matching filename
- **Hooks:** camelCase starting with 'use' (e.g., `useAuth`, `useTheme`)
- **Utilities:** camelCase (e.g., `formatDate`, `calculateTotal`)

### Props Patterns

**✅ DO:**
```typescript
// Destructure props in function signature
function Card({ title, description }: CardProps) { }

// Use optional props with defaults
function Button({ variant = 'primary' }: ButtonProps) { }

// Readonly for children
interface LayoutProps {
  children: Readonly<React.ReactNode>;
}
```

**❌ DON'T:**
```typescript
// Don't use props object without destructuring
function Card(props: CardProps) {
  return <div>{props.title}</div>;
}

// Don't use unnecessary prop spreading
<Button {...{onClick, disabled, variant}} />
```

### Server vs Client Components

**Server Components (default):**
```typescript
// No 'use client' directive = Server Component
export default function Page() {
  // Can use async/await
  // Can access server-side resources
  return <div>Server Component</div>;
}
```

**Client Components (when needed):**
```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**When to use Client Components:**
- Need useState, useEffect, or other React hooks
- Event handlers (onClick, onChange, etc.)
- Browser-only APIs (localStorage, window, etc.)
- Third-party libraries requiring client-side

## File Organization

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # UI primitives
│   └── features/         # Feature-specific components
├── lib/                   # Utilities and helpers
│   ├── utils.ts          # General utilities
│   └── api.ts            # API client
├── types/                 # Shared TypeScript types
└── styles/               # Global styles (if needed)
```

### File Naming

- **Components:** PascalCase (e.g., `Button.tsx`, `UserCard.tsx`)
- **Utilities:** camelCase (e.g., `formatDate.ts`, `apiClient.ts`)
- **Types:** camelCase (e.g., `user.types.ts`, `api.types.ts`)
- **Tests:** Match source file with `.test.ts` or `.spec.ts`
- **Config:** kebab-case (e.g., `next.config.ts`, `eslint.config.mjs`)

### Import Order

**✅ Standard Order:**
```typescript
// 1. External dependencies
import { useState } from 'react';
import type { Metadata } from 'next';

// 2. Internal absolute imports (with @/ alias)
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

// 3. Relative imports
import { localHelper } from './utils';

// 4. Styles (if using CSS modules)
import styles from './Component.module.css';
```

## Styling Conventions

### Tailwind CSS

**✅ DO:**
```typescript
// Use utility classes in logical order: layout → spacing → sizing → colors → typography
<div className="flex items-center justify-between p-4 bg-white dark:bg-black">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
    Title
  </h1>
</div>

// Use responsive prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Use arbitrary values sparingly
<div className="w-[calc(100%-2rem)]">
```

**❌ DON'T:**
```typescript
// Don't use inline styles (except for dynamic values)
<div style={{ backgroundColor: 'red' }}>

// Don't create one-off classes in globals.css
.my-specific-button { }

// Don't mix Tailwind with traditional CSS
<div className="flex custom-class">
```

### Class Name Organization

**Recommended Order:**
1. Layout: `flex`, `grid`, `block`, `inline`
2. Positioning: `absolute`, `relative`, `fixed`
3. Display: `hidden`, `visible`
4. Spacing: `p-*`, `m-*`, `gap-*`
5. Sizing: `w-*`, `h-*`, `max-w-*`
6. Typography: `text-*`, `font-*`, `leading-*`
7. Colors: `bg-*`, `text-*`, `border-*`
8. Effects: `shadow-*`, `opacity-*`, `transition-*`
9. States: `hover:*`, `focus:*`, `active:*`
10. Responsive: `sm:*`, `md:*`, `lg:*`, `xl:*`
11. Dark mode: `dark:*`

### CSS Variables

**File:** `src/app/globals.css:3`

**✅ DO:**
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

**Naming:** kebab-case with semantic names

## Code Quality

### ESLint Configuration

**File:** `eslint.config.mjs:1`

- Uses ESLint 9 flat config format
- Extends Next.js recommended rules
- TypeScript support enabled

**✅ DO:**
```typescript
// Follow ESLint rules
// Use consistent quote style (enforced by config)
const name = 'John';

// No unused variables
import { useState } from 'react'; // Only import what you use

// Consistent indentation (2 spaces)
function example() {
  return (
    <div>
      <p>Content</p>
    </div>
  );
}
```

### Code Comments

**✅ DO:**
```typescript
// Explain WHY, not WHAT
// Calculate total including 15% service charge
const total = subtotal * 1.15;

// Document complex logic
/**
 * Formats date for display based on locale
 * @param date - Date to format
 * @param locale - User's locale (defaults to 'en-US')
 * @returns Formatted date string
 */
function formatDate(date: Date, locale = 'en-US'): string {
  return date.toLocaleDateString(locale);
}
```

**❌ DON'T:**
```typescript
// Don't state the obvious
// Set x to 5
const x = 5;

// Don't leave commented-out code
// const oldFunction = () => { ... };

// Don't use TODO without tracking
// TODO: fix this later
```

## Git Conventions

### Commit Messages

**Format:**
```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Examples:**
```
feat: add user authentication flow

fix: resolve dark mode color contrast issue

docs: update README with setup instructions

refactor: extract form validation to utility function
```

### Branch Naming

**Format:** `<type>/<description>`

**Examples:**
```
feature/user-authentication
fix/dark-mode-colors
docs/api-documentation
refactor/component-structure
```

## Best Practices

### Performance

**✅ DO:**
```typescript
// Use Next.js Image component
import Image from 'next/image';
<Image src="/logo.png" width={100} height={100} alt="Logo" />

// Use next/font for font optimization
import { Geist } from 'next/font/google';
const font = Geist({ subsets: ['latin'] });

// Use React Server Components by default
export default function Page() {
  // Server component - no 'use client'
}
```

### Accessibility

**✅ DO:**
```typescript
// Always include alt text
<Image src="/photo.jpg" alt="Description of photo" />

// Use semantic HTML
<button onClick={handleClick}>Click me</button>
// Not: <div onClick={handleClick}>Click me</div>

// Include labels for inputs
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Support keyboard navigation
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Action
</button>
```

### Security

**✅ DO:**
```typescript
// Sanitize user input
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);

// Use environment variables for secrets
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// Validate data
import { z } from 'zod';
const schema = z.object({ email: z.string().email() });
```

## Testing Conventions

### File Naming

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
```

### Test Structure

**✅ Preferred Pattern:**
```typescript
describe('Button', () => {
  it('renders with correct label', () => {
    // Arrange
    const label = 'Click me';

    // Act
    render(<Button label={label} />);

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
```

## Documentation

### Code Documentation

**✅ DO:**
```typescript
/**
 * Calculates the total price including tax
 * @param price - Base price before tax
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns Total price including tax
 */
export function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}
```

### File Headers

Not required for standard files, but consider for:
- Complex utilities
- API client files
- Configuration files

### README Updates

Update README.md when:
- Adding new dependencies
- Changing setup instructions
- Adding new scripts
- Modifying environment variables

## Enforcement

### Automated Checks

- **ESLint:** `npm run lint` (runs on pre-commit)
- **TypeScript:** Type checking during build
- **Prettier:** (to be configured)
- **Tests:** (to be configured with CI)

### Code Review

All code changes require:
- ✅ ESLint passing
- ✅ TypeScript compilation successful
- ✅ No console.log statements (use proper logging)
- ✅ Meaningful commit messages
- ✅ Updated documentation if needed

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ESLint Rules](https://eslint.org/docs/rules/)
