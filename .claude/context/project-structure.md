---
created: 2025-10-23T10:11:17Z
last_updated: 2025-10-23T10:11:17Z
version: 1.0
author: Claude Code PM System
---

# Project Structure

## Directory Organization

```
ccpm-testing/
├── .claude/               # Claude Code PM configuration
│   ├── commands/          # Custom slash commands
│   ├── context/           # Project context documentation
│   ├── prds/              # Product requirement documents
│   ├── rules/             # Project rules and guidelines
│   └── scripts/           # PM automation scripts
├── .next/                 # Next.js build output (generated)
├── node_modules/          # NPM dependencies (generated)
├── public/                # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/                   # Application source code
│   └── app/               # Next.js App Router directory
│       ├── favicon.ico    # Site favicon
│       ├── globals.css    # Global styles
│       ├── layout.tsx     # Root layout component
│       └── page.tsx       # Homepage component
├── .gitignore             # Git ignore patterns
├── CLAUDE.md              # Claude Code PM configuration
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── next-env.d.ts          # Next.js TypeScript declarations
├── package.json           # NPM package manifest
├── package-lock.json      # NPM dependency lock
├── postcss.config.mjs     # PostCSS configuration
├── README.md              # Project documentation
└── tsconfig.json          # TypeScript configuration
```

## Key Directories

### `/src/app/`
- **Purpose:** Next.js App Router application code
- **Structure:** File-based routing system
- **Key Files:**
  - `layout.tsx` - Root layout wrapper for all pages
  - `page.tsx` - Homepage route component
  - `globals.css` - Global CSS styles with Tailwind directives

### `/.claude/`
- **Purpose:** Claude Code project management system
- **Structure:** Organized by functionality
- **Subdirectories:**
  - `commands/` - Custom slash command definitions
  - `context/` - Project context documentation
  - `prds/` - Product requirement documents
  - `rules/` - Project-specific rules and conventions
  - `scripts/` - Automation scripts for PM workflows

### `/public/`
- **Purpose:** Static assets served at root URL
- **Contents:** SVG icons and images
- **Access:** Files available at `/<filename>`

## File Naming Patterns

### TypeScript/React Files
- **Components:** PascalCase (e.g., `Layout.tsx`, `Page.tsx`)
- **Utilities:** camelCase with `.ts` extension
- **Type Definitions:** PascalCase with `.d.ts` extension

### Configuration Files
- **Modern JS Config:** `.mjs` extension (ESM modules)
- **TypeScript Config:** `.ts` extension for Next.js config
- **Legacy/Common:** `.json` for package manifests

### Style Files
- **Global Styles:** `globals.css`
- **Component Styles:** CSS Modules with `.module.css` (if used)
- **Tailwind:** Utility-first classes in JSX

## Module Organization

### App Router Structure
- Uses Next.js 16 App Router (not Pages Router)
- File-based routing in `/src/app/`
- Special files: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`

### Import Paths
- **Absolute Imports:** Configured with `@/*` alias mapping to `./src/*`
- **Example:** `import Component from '@/components/Component'`

## Generated/Build Artifacts

- `.next/` - Next.js build cache and output
- `node_modules/` - NPM dependencies
- `next-env.d.ts` - Auto-generated TypeScript definitions
- `package-lock.json` - Dependency resolution lock file

## Configuration Files

- `tsconfig.json` - TypeScript compiler options
- `next.config.ts` - Next.js framework configuration
- `eslint.config.mjs` - ESLint v9 flat config
- `postcss.config.mjs` - PostCSS/Tailwind processing
- `.gitignore` - Version control exclusions
- `CLAUDE.md` - Claude Code PM settings
