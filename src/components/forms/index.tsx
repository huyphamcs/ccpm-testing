/**
 * Dynamic Form Components Exports
 *
 * This file provides dynamically imported form components for code splitting.
 * Forms are heavy components (with react-hook-form, zod, etc.) and are perfect
 * candidates for lazy loading to reduce initial bundle size.
 *
 * Benefits:
 * - Reduces initial JavaScript bundle size
 * - Forms only load when needed (below the fold)
 * - Improves initial page load performance (LCP, FID)
 * - Better caching with separate chunks
 *
 * Usage:
 * ```tsx
 * import { DemoFormDynamic, NewsletterFormDynamic, SignupFormDynamic } from '@/components/forms';
 *
 * function MyComponent() {
 *   return <DemoFormDynamic />;
 * }
 * ```
 */

import dynamic from 'next/dynamic';

// Loading component shown while form is being loaded
const FormLoadingSkeleton = () => (
  <div className="w-full max-w-md space-y-4 animate-pulse" role="status" aria-live="polite">
    <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
    <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
    <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
    <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
    <span className="sr-only">Loading form...</span>
  </div>
);

/**
 * Dynamically imported DemoForm component
 * Use this instead of direct import for better code splitting
 */
export const DemoFormDynamic = dynamic(
  () => import('./DemoForm'),
  {
    loading: FormLoadingSkeleton,
    ssr: false, // Forms are interactive, can skip SSR for better performance
  }
);

/**
 * Dynamically imported NewsletterForm component
 * Use this instead of direct import for better code splitting
 */
export const NewsletterFormDynamic = dynamic(
  () => import('./NewsletterForm'),
  {
    loading: () => (
      <div className="w-full space-y-3 animate-pulse" role="status" aria-live="polite">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-10 w-full sm:w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        </div>
        <span className="sr-only">Loading form...</span>
      </div>
    ),
    ssr: false, // Forms are interactive, can skip SSR for better performance
  }
);

/**
 * Dynamically imported SignupForm component
 * Use this instead of direct import for better code splitting
 */
export const SignupFormDynamic = dynamic(
  () => import('./SignupForm'),
  {
    loading: FormLoadingSkeleton,
    ssr: false, // Forms are interactive, can skip SSR for better performance
  }
);

// Also export regular components for cases where dynamic import isn't needed
export { default as DemoForm } from './DemoForm';
export { default as NewsletterForm } from './NewsletterForm';
export { default as SignupForm } from './SignupForm';

// Export types
export type { DemoFormProps } from './DemoForm';
export type { NewsletterFormProps } from './NewsletterForm';
export type { SignupFormProps } from './SignupForm';
