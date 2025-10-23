---
created: 2025-10-23T10:11:17Z
last_updated: 2025-10-23T10:11:17Z
version: 1.0
author: Claude Code PM System
---

# Technical Context

## Technology Stack

### Core Framework
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library
- **React DOM 19.2.0** - React renderer for web

### Language & Runtime
- **TypeScript 5.x** - Primary development language
- **Node.js** - Runtime environment (version not specified in package.json)
- **Target:** ES2017 (as per tsconfig.json)

### Styling
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **PostCSS** - CSS transformation with `@tailwindcss/postcss` plugin
- **CSS Support:** Modern CSS with PostCSS processing

### Development Tools
- **ESLint 9.x** - Code linting with flat config
- **eslint-config-next 16.0.0** - Next.js-specific ESLint rules
- **TypeScript Compiler** - Type checking and compilation

## Dependencies

### Production Dependencies
```json
{
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "next": "16.0.0"
}
```

### Development Dependencies
```json
{
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4",
  "eslint": "^9",
  "eslint-config-next": "16.0.0"
}
```

**Total Package Count:** 7 dependencies (3 production, 4 development)

## TypeScript Configuration

### Compiler Options
- **Module System:** ESNext with bundler resolution
- **JSX:** react-jsx (React 17+ transform)
- **Target:** ES2017
- **Strict Mode:** Enabled
- **Path Aliases:** `@/*` maps to `./src/*`
- **Lib:** DOM, DOM.Iterable, ESNext

### Key Settings
- `skipLibCheck: true` - Skip type checking of declaration files
- `noEmit: true` - No compilation output (Next.js handles builds)
- `incremental: true` - Faster subsequent builds
- `isolatedModules: true` - Ensures each file can be safely transpiled

## Build & Development Tools

### NPM Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

### Package Manager
- **Current:** NPM (package-lock.json present)
- **Previous:** pnpm (recently migrated from, pnpm-lock.yaml deleted)

## Development Environment

### ESLint Configuration
- **Version:** 9.x (modern flat config format)
- **Config File:** `eslint.config.mjs`
- **Extends:** Next.js ESLint configuration

### PostCSS Configuration
- **File:** `postcss.config.mjs`
- **Plugins:** Tailwind CSS v4 PostCSS integration

### Next.js Configuration
- **File:** `next.config.ts` (TypeScript config)
- **Router:** App Router (Next.js 13+)

## Project Management Tools

### Claude Code PM System
- **CCPM:** Installed and configured
- **GitHub CLI:** Integrated for issue/PR management
- **Extensions:** gh-sub-issue for epic management

### Version Control
- **Git:** Repository initialized
- **Remote:** https://github.com/XDefai/tasmil-labs-fe.git
- **Branch:** main

## Architecture Patterns

### Rendering Strategy
- **Default:** Server Components (Next.js App Router)
- **Client Components:** Opt-in with `'use client'` directive
- **Images:** Next.js Image optimization

### Styling Approach
- **Framework:** Tailwind CSS utility-first
- **Dark Mode:** Configured with `dark:` variant classes
- **Responsive:** Mobile-first with Tailwind breakpoints (sm, md)

## Version Requirements

### Minimum Versions
- Node.js: Not explicitly specified (recommend Node 18+)
- NPM: Not explicitly specified (recommend NPM 9+)
- TypeScript: 5.x

### Browser Support
- **Target:** ES2017-compatible browsers
- **Features:** Modern DOM APIs, ESNext features

## Development Workflow

1. **Install:** `npm install`
2. **Dev Server:** `npm run dev` (runs on http://localhost:3000)
3. **Build:** `npm run build`
4. **Production:** `npm start`
5. **Lint:** `npm run lint`

## Missing/Not Configured

- **Testing Framework:** No test runner configured
- **CI/CD:** No automation pipelines
- **Prettier:** Code formatting not configured
- **Husky/Git Hooks:** No pre-commit hooks
- **Environment Variables:** No .env files detected
