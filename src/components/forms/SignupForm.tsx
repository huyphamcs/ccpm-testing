/**
 * SignupForm Component
 *
 * A comprehensive signup form with email, name, and optional company/source fields.
 * Features: Zod validation, loading states, success confirmation, and full accessibility.
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema } from '@/lib/validation/formSchemas';
import type { SignupFormData } from '@/types/forms';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export interface SignupFormProps {
  /**
   * Callback when form is successfully submitted
   */
  onSuccess?: (data: SignupFormData) => void;

  /**
   * Custom submit function (defaults to mock API call)
   */
  onSubmit?: (data: SignupFormData) => Promise<void>;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom success message
   */
  successMessage?: string;

  /**
   * Show optional fields (company, source)
   * @default true
   */
  showOptionalFields?: boolean;

  /**
   * Button text
   */
  buttonText?: string;
}

/**
 * Signup form component with email, name, and optional fields
 * Mobile-first responsive design with WCAG 2.1 AA compliance
 */
export default function SignupForm({
  onSuccess,
  onSubmit,
  className = '',
  successMessage = 'Account created successfully! Please check your email to verify your account.',
  showOptionalFields = true,
  buttonText = 'Sign Up',
}: SignupFormProps) {
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onBlur', // Validate on blur for better UX
  });

  // Form submission handler with loading and success states
  const { handleSubmit, isSubmitting, isSuccess, state } = useFormSubmit<SignupFormData>(
    async (data) => {
      // Use custom submit function or default mock
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Mock API call (replace with actual API endpoint)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Signup data:', data);
      }
    },
    {
      onSuccess: (data) => {
        reset(); // Clear form on success
        onSuccess?.(data);
      },
      successMessage,
      successDuration: 5000, // Show success message for 5 seconds
    }
  );

  // Combine form submission
  const onFormSubmit = handleFormSubmit((data) => handleSubmit(data));

  return (
    <div className={`w-full max-w-md ${className}`}>
      <form
        onSubmit={onFormSubmit}
        className="w-full space-y-4"
        noValidate
        aria-label="Signup form"
      >
        {/* Success message */}
        {isSuccess && (
          <div
            className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950 dark:border-green-800"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-green-800 dark:text-green-200">
                {state.message}
              </p>
            </div>
          </div>
        )}

        {/* Error message (global) */}
        {state.status === 'error' && state.message && (
          <div
            className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950 dark:border-red-800"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-800 dark:text-red-200">
                {state.message}
              </p>
            </div>
          </div>
        )}

        {/* Email field */}
        <Input
          {...register('email')}
          type="email"
          label="Email"
          placeholder="you@example.com"
          error={errors.email?.message}
          disabled={isSubmitting}
          autoComplete="email"
          required
        />

        {/* Full name field */}
        <Input
          {...register('fullName')}
          type="text"
          label="Full Name"
          placeholder="John Doe"
          error={errors.fullName?.message}
          disabled={isSubmitting}
          autoComplete="name"
          required
        />

        {/* Optional fields */}
        {showOptionalFields && (
          <>
            {/* Company field */}
            <Input
              {...register('company')}
              type="text"
              label="Company"
              labelExtra="Optional"
              placeholder="Acme Inc."
              error={errors.company?.message}
              disabled={isSubmitting}
              autoComplete="organization"
            />

            {/* Source field */}
            <Input
              {...register('source')}
              type="text"
              label="How did you hear about us?"
              labelExtra="Optional"
              placeholder="e.g., Google, friend, social media"
              error={errors.source?.message}
              disabled={isSubmitting}
            />
          </>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting || isSuccess}
          fullWidth
          size="lg"
        >
          {buttonText}
        </Button>

        {/* Privacy notice */}
        <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
          By signing up, you agree to our{' '}
          <a
            href="/terms"
            className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Privacy Policy
          </a>
          .
        </p>

        {/* Screen reader announcements */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {isSubmitting && 'Submitting signup form...'}
          {isSuccess && 'Signup successful!'}
        </div>
      </form>
    </div>
  );
}
