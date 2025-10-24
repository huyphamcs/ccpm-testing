/**
 * DemoForm Component
 *
 * A comprehensive demo request form extending the signup form with additional fields.
 * Features: phone validation, company size dropdown, Zod validation, loading states,
 * success confirmation, and full WCAG 2.1 AA accessibility.
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { demoFormSchema } from '@/lib/validation/formSchemas';
import type { DemoFormData } from '@/types/forms';
import { COMPANY_SIZE_OPTIONS } from '@/types/forms';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export interface DemoFormProps {
  /**
   * Callback when form is successfully submitted
   */
  onSuccess?: (data: DemoFormData) => void;

  /**
   * Custom submit function (defaults to mock API call)
   */
  onSubmit?: (data: DemoFormData) => Promise<void>;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom success message
   */
  successMessage?: string;

  /**
   * Show optional fields (phone, company size)
   * @default true
   */
  showOptionalFields?: boolean;

  /**
   * Button text
   */
  buttonText?: string;
}

/**
 * Demo request form component with comprehensive fields
 * Mobile-first responsive design with full accessibility support
 */
export default function DemoForm({
  onSuccess,
  onSubmit,
  className = '',
  successMessage = 'Thank you! Our team will contact you shortly to schedule your demo.',
  showOptionalFields = true,
  buttonText = 'Request Demo',
}: DemoFormProps) {
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
    mode: 'onBlur', // Validate on blur for better UX
  });

  // Form submission handler with loading and success states
  const { handleSubmit, isSubmitting, isSuccess, state } = useFormSubmit<DemoFormData>(
    async (data) => {
      // Use custom submit function or default mock
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Mock API call (replace with actual API endpoint)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Demo request data:', data);
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
        aria-label="Demo request form"
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
          label="Work Email"
          placeholder="you@company.com"
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

        {/* Optional fields */}
        {showOptionalFields && (
          <>
            {/* Phone field */}
            <Input
              {...register('phone')}
              type="tel"
              label="Phone Number"
              labelExtra="Optional"
              placeholder="(123) 456-7890"
              error={errors.phone?.message}
              disabled={isSubmitting}
              autoComplete="tel"
            />

            {/* Company size dropdown */}
            <div className="w-full">
              <label
                htmlFor="companySize"
                className="block mb-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                <span className="flex items-center justify-between">
                  <span>Company Size</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                    Optional
                  </span>
                </span>
              </label>

              <select
                {...register('companySize')}
                id="companySize"
                disabled={isSubmitting}
                aria-describedby={
                  errors.companySize ? 'companySize-error' : undefined
                }
                aria-invalid={!!errors.companySize}
                className={`w-full px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-900 text-black dark:text-white bg-white dark:bg-black ${
                  errors.companySize
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:focus:border-red-600 dark:focus:ring-red-600'
                    : 'border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-100 dark:focus:ring-zinc-100'
                }`}
              >
                <option value="">Select company size</option>
                {COMPANY_SIZE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {errors.companySize && (
                <p
                  id="companySize-error"
                  className="mt-1.5 text-sm text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {errors.companySize.message}
                </p>
              )}
            </div>
          </>
        )}

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
          By requesting a demo, you agree to our{' '}
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
          . We&apos;ll contact you to schedule your personalized demo.
        </p>

        {/* Screen reader announcements */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {isSubmitting && 'Submitting demo request...'}
          {isSuccess && 'Demo request submitted successfully!'}
        </div>
      </form>
    </div>
  );
}
