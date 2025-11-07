/**
 * Button Component
 *
 * A reusable button component with different variants and states.
 * Supports loading states, disabled states, and different visual styles.
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content (text or elements)
   */
  children: ReactNode;

  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';

  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the button is in loading state
   * Shows a spinner and disables interaction
   * @default false
   */
  isLoading?: boolean;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Button component with variants, sizes, and loading states
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantStyles = {
    primary:
      'bg-black text-white hover:bg-zinc-800 focus:ring-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:focus:ring-zinc-100',
    secondary:
      'bg-zinc-100 text-black hover:bg-zinc-200 focus:ring-zinc-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:focus:ring-zinc-600',
    outline:
      'border border-zinc-300 bg-transparent text-black hover:bg-zinc-50 focus:ring-zinc-300 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900 dark:focus:ring-zinc-600',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Combine all styles
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={combinedClassName}
      aria-busy={isLoading}
      aria-live="polite"
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
            role="img"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
