/**
 * Input Component
 *
 * A reusable input component with label, error states, and accessibility features.
 * Designed to work seamlessly with React Hook Form.
 */

import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input label text
   */
  label?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display below input
   */
  helperText?: string;

  /**
   * Additional content to display in label (e.g., "optional" badge)
   */
  labelExtra?: ReactNode;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;
}

/**
 * Input component with label, error states, and accessibility
 * Uses forwardRef to work with React Hook Form
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      labelExtra,
      required = false,
      id,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Base input styles
    const baseInputStyles =
      'w-full px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-900';

    // Conditional styles based on error state
    const conditionalStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:border-red-600 dark:focus:ring-red-600'
      : 'border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-100 dark:focus:ring-zinc-100';

    // Text styles
    const textStyles = 'text-black dark:text-white bg-white dark:bg-black';

    // Combine all input styles
    const combinedInputClassName = `${baseInputStyles} ${conditionalStyles} ${textStyles} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            <span className="flex items-center justify-between">
              <span>
                {label}
                {required && (
                  <span className="ml-1 text-red-500" aria-label="required">
                    *
                  </span>
                )}
              </span>
              {labelExtra && (
                <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                  {labelExtra}
                </span>
              )}
            </span>
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={combinedInputClassName}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
