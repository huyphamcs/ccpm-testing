---
created: 2025-10-23T10:11:17Z
last_updated: 2025-10-23T10:11:17Z
version: 1.0
author: Claude Code PM System
---

# System Patterns & Architecture

## Architectural Style

### Next.js App Router Architecture
- **Pattern:** Server-First React with App Router
- **Rendering:** Server Components by default, Client Components opt-in
- **Routing:** File-system based routing in `/src/app/`
- **Data Flow:** Server-to-client, fetch on server where possible

### Component Architecture
- **Pattern:** Functional components with TypeScript
- **State Management:** React hooks (useState, useEffect, etc.)
- **Props:** Strongly typed with TypeScript interfaces
- **Composition:** Component nesting via `children` prop

## Design Patterns Observed

### 1. Layout Pattern
**File:** `src/app/layout.tsx:1`

- **Pattern:** Root Layout Wrapper
- **Purpose:** Shared layout for all routes
- **Features:**
  - Font optimization with `next/font`
  - Metadata configuration
  - Global CSS imports
  - HTML/body structure

```typescript
export default function RootLayout({ children }: { children: React.ReactNode })
```

### 2. Font Loading Pattern
**File:** `src/app/layout.tsx:5`

- **Pattern:** Variable Fonts with CSS Custom Properties
- **Implementation:** Next.js font optimization
- **Fonts Used:**
  - Geist Sans (variable font)
  - Geist Mono (variable font)
- **CSS Variables:** `--font-geist-sans`, `--font-geist-mono`

### 3. CSS Custom Properties Pattern
**File:** `src/app/globals.css:3`

- **Pattern:** Theme Variables
- **Implementation:**
  - `--background` and `--foreground` for theming
  - Tailwind theme integration with `@theme inline`
  - Media query for dark mode preference

### 4. Image Optimization Pattern
**File:** `src/app/page.tsx:7`

- **Pattern:** Next.js Image Component
- **Benefits:** Automatic optimization, lazy loading, responsive images
- **Usage:** `<Image>` component with width/height/priority props

### 5. Dark Mode Pattern
**File:** `src/app/globals.css:15`

- **Pattern:** System Preference Detection
- **Implementation:** `prefers-color-scheme: dark` media query
- **Tailwind Integration:** `dark:` variant classes in components
- **Scope:** Global via CSS variables

## Code Organization Patterns

### File Structure
- **Colocated Styles:** `globals.css` next to `layout.tsx`
- **Route Segments:** Each folder in `/app/` is a route segment
- **Special Files:** `layout.tsx`, `page.tsx`, `favicon.ico`

### Import Patterns
- **Path Aliases:** `@/*` for absolute imports from `src/`
- **Type Imports:** `import type { Metadata }` for TypeScript types
- **Named Imports:** Destructured imports from packages

### Naming Conventions
- **Components:** PascalCase function names (e.g., `RootLayout`, `Home`)
- **Files:** lowercase with extension (e.g., `layout.tsx`, `page.tsx`)
- **CSS Variables:** kebab-case with `--` prefix
- **Tailwind Classes:** Utility-first, responsive prefixes

## Data Flow Patterns

### Server-Side First
- **Default:** Components render on server
- **Benefits:** SEO, performance, reduced JavaScript bundle
- **Client Boundary:** Explicit with `'use client'` directive

### Metadata Pattern
**File:** `src/app/layout.tsx:15`

- **Pattern:** Static Metadata Export
- **Type:** `Metadata` from Next.js
- **Scope:** SEO and social sharing tags

## Styling Patterns

### Tailwind Utility-First
**File:** `src/app/page.tsx:5`

- **Pattern:** Inline utility classes
- **Responsive:** Breakpoint prefixes (sm:, md:)
- **State Variants:** hover:, dark:
- **Example:**
  ```tsx
  className="flex min-h-screen items-center justify-center"
  ```

### CSS Variable Theming
- **Pattern:** CSS custom properties + Tailwind theme
- **Variables:** `--background`, `--foreground`, `--font-*`
- **Integration:** Tailwind `@theme inline` directive

### Font Optimization
- **Pattern:** Variable fonts with CSS custom properties
- **Loading:** `next/font/google` for automatic optimization
- **Fallback:** System fonts specified in CSS

## Component Patterns

### Functional Components
- **Pattern:** Named function exports
- **TypeScript:** Typed props and return values
- **JSX:** React 17+ JSX transform (no React import needed)

### Props Pattern
```typescript
{ children }: Readonly<{ children: React.ReactNode }>
```
- **Readonly:** Enforces immutability
- **Typed:** React.ReactNode for children

## Configuration Patterns

### TypeScript Configuration
- **Strict Mode:** Enabled for type safety
- **Path Mapping:** Absolute imports with `@/*`
- **JSX:** Modern react-jsx transform
- **No Emit:** Compilation handled by Next.js

### ESLint Configuration
- **Format:** Flat config (ESLint 9)
- **Extends:** Next.js recommended rules
- **File:** `eslint.config.mjs` (ESM module)

## Anti-Patterns Avoided

✅ **No Client Component Overuse** - Server Components by default
✅ **No Inline Styles** - Uses Tailwind utilities
✅ **No Props Drilling** - Clean component hierarchy
✅ **No Untyped Props** - Full TypeScript coverage
✅ **No Manual Image Optimization** - Uses Next.js Image component

## Future Pattern Considerations

- **State Management:** Consider Context API or Zustand when complexity grows
- **Data Fetching:** Server Actions for mutations, fetch for queries
- **Form Handling:** React Server Actions or libraries like react-hook-form
- **Testing:** Jest + React Testing Library patterns
- **API Routes:** Route handlers in `/app/api/` when needed
