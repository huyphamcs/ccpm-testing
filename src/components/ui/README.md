# UI Component Library

Reusable, accessible UI primitives for the landing page.

## Components

### Button

A versatile button component with multiple variants and sizes.

**Variants:**
- `primary` - Primary action button (default)
- `secondary` - Secondary action button
- `outline` - Outlined button
- `ghost` - Transparent button

**Sizes:**
- `sm` - Small (36px height)
- `md` - Medium (44px height, default)
- `lg` - Large (56px height)

**Features:**
- Loading state with spinner
- Full width option
- Keyboard accessible
- ARIA attributes

**Usage:**
```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="outline" isLoading>
  Loading...
</Button>

<Button variant="ghost" fullWidth>
  Full width button
</Button>
```

### Input

Form input component with label, error states, and helper text.

**Variants:**
- `default` - Standard input (default)
- `error` - Error state (auto-applied when error prop is present)
- `success` - Success state

**Features:**
- Label with required indicator
- Error message display
- Helper text
- Full width option
- Accessible with ARIA attributes

**Usage:**
```tsx
import { Input } from "@/components/ui";

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  required
/>

<Input
  label="Username"
  error="Username is already taken"
  helperText="Choose a unique username"
/>

<Input fullWidth placeholder="Search..." />
```

### Card

Container component for grouping related content.

**Padding:**
- `none` - No padding
- `sm` - Small (16px)
- `md` - Medium (24px, default)
- `lg` - Large (32px)

**Sub-components:**
- `CardHeader` - Header container
- `CardTitle` - Title heading
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer with actions

**Features:**
- Hover effect option
- Composable structure
- Consistent styling

**Usage:**
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button
} from "@/components/ui";

<Card hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Section

Page section component with consistent spacing and optional container.

**Spacing:**
- `none` - No vertical padding
- `sm` - Small (32px)
- `md` - Medium (48px)
- `lg` - Large (64px, default)
- `xl` - Extra large (96px)

**Features:**
- Auto container with max-width (default)
- Responsive padding
- Semantic HTML (`<section>`)

**Usage:**
```tsx
import { Section } from "@/components/ui";

<Section spacing="lg">
  <h2>Section Title</h2>
  <p>Content automatically contained and centered</p>
</Section>

<Section spacing="xl" container={false}>
  <div>Full width content without container</div>
</Section>
```

### Container

Standalone container component for max-width wrapping.

**Usage:**
```tsx
import { Container } from "@/components/ui";

<Container>
  <div>Content with max-width and responsive padding</div>
</Container>
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: All interactive components support keyboard navigation
- **ARIA Attributes**: Proper ARIA labels, roles, and states
- **Focus Indicators**: Visible focus rings with proper contrast
- **Color Contrast**: All text meets minimum contrast ratios
- **Semantic HTML**: Proper use of semantic elements

## Design Tokens

Components use CSS variables defined in `globals.css`:

- Colors: `--color-primary-*`, `--color-neutral-*`, `--color-*`
- Typography: `--font-sans`, `--font-mono`, `--font-size-*`
- Spacing: `--spacing-*`
- Border Radius: `--radius-*`
- Shadows: `--shadow-*`

## TypeScript

All components are fully typed with exported TypeScript interfaces:

- `ButtonProps`
- `InputProps`
- `CardProps`
- `SectionProps`

See `src/types/components.ts` for full type definitions.

## Mobile Responsive

All components are mobile-first and responsive:

- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Targets**: Minimum 44px height for touch interfaces
- **Flexible Layouts**: Components adapt to container width
