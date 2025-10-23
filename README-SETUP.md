# Project Setup Documentation

## Technology Stack

- **Framework**: Next.js 16.0.0 with App Router
- **React**: v19.2.0
- **TypeScript**: v5
- **Styling**: Tailwind CSS v4 with PostCSS
- **Form Handling**: React Hook Form v7 + Zod v4 for validation
- **Fonts**: Geist Sans & Geist Mono (Google Fonts)

## Design System

### Design Tokens

All design tokens are defined in `src/app/globals.css`:

#### Colors
- **Primary**: Blue scale (50-900)
- **Neutral**: Gray scale (50-900)
- **Semantic**: Background, foreground, muted, border, success, error, warning

#### Typography
- **Font Families**: Geist Sans (body), Geist Mono (code)
- **Font Sizes**: xs (12px) → 5xl (48px)

#### Spacing
- **Scale**: 1 (4px) → 24 (96px)

#### Border Radius
- **Sizes**: sm (4px) → full (9999px)

#### Shadows
- **Levels**: sm, md, lg, xl

### Dark Mode

Automatic dark mode support via `prefers-color-scheme` media query.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with fonts
│   ├── page.tsx         # Landing page (will be implemented)
│   └── globals.css      # Design tokens & global styles
├── components/
│   └── ui/              # Reusable UI primitives (TBD)
└── lib/
    └── utils.ts         # Utility functions (cn, formatDate)
```

## Path Aliases

Configured in `tsconfig.json`:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/app/*` → `./src/app/*`

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Next Steps

1. Create UI component library (Button, Input, Card, Section)
2. Implement landing page sections (Hero, Features, Testimonials, etc.)
3. Build form components with validation
4. Add API routes for form submissions
5. Implement analytics and SEO optimization

## Dependencies Installed

### Production
- next: ^16.0.0
- react: ^19.2.0
- react-dom: ^19.2.0
- react-hook-form: ^7.65.0
- zod: ^4.1.12
- @hookform/resolvers: ^5.2.2

### Development
- typescript: ^5
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19
- tailwindcss: ^4
- @tailwindcss/postcss: ^4
- eslint: ^9
- eslint-config-next: ^16.0.0
