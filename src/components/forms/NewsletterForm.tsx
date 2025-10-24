/**
 * NewsletterForm Component
 *
 * A simple email-only subscription form for newsletter signups.
 * Features: email validation, loading states, success confirmation, and accessibility.
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterFormSchema } from '@/lib/validation/formSchemas';
import type { NewsletterFormData } from '@/types/forms';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export interface NewsletterFormProps {
  /**
   * Callback when form is successfully submitted
   */
  onSuccess?: (data: NewsletterFormData) => void;

  /**
   * Custom submit function (defaults to mock API call)
   */
  onSubmit?: (data: NewsletterFormData) => Promise<void>;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom success message
   */
  successMessage?: string;

  /**
   * Placeholder text for email input
   */
  emailPlaceholder?: string;

  /**
   * Button text
   */
  buttonText?: string;
}

/**
 * Newsletter subscription form component
 * Mobile-first responsive design with full accessibility support
 */
export default function NewsletterForm({
  onSuccess,
  onSubmit,
  className = '',
  successMessage = 'Thank you for subscribing! Check your email for confirmation.',
  emailPlaceholder = 'Enter your email',
  buttonText = 'Subscribe',
}: NewsletterFormProps) {
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterFormSchema),
    mode: 'onBlur', // Validate on blur for better UX
  });

  // Form submission handler with loading and success states
  const { handleSubmit, isSubmitting, isSuccess, state } = useFormSubmit<NewsletterFormData>(
    async (data) => {
      // Use custom submit function or default mock
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Mock API call (replace with actual API endpoint)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Newsletter signup:', data);
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
    <div className={`w-full ${className}`}>
      <form
        onSubmit={onFormSubmit}
        className="w-full"
        noValidate
        aria-label="Newsletter subscription form"
      >
        {/* Success message */}
        {isSuccess && (
          <div
            className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950 dark:border-green-800"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm text-green-800 dark:text-green-200">
              {state.message}
            </p>
          </div>
        )}

        {/* Error message (global) */}
        {state.status === 'error' && state.message && (
          <div
            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950 dark:border-red-800"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-sm text-red-800 dark:text-red-200">
              {state.message}
            </p>
          </div>
        )}

        {/* Form fields */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <Input
              {...register('email')}
              type="email"
              placeholder={emailPlaceholder}
              error={errors.email?.message}
              disabled={isSubmitting}
              autoComplete="email"
              aria-label="Email address"
              required
            />
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting || isSuccess}
            className="sm:w-auto"
          >
            {buttonText}
          </Button>
        </div>

        {/* Screen reader announcements */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {isSubmitting && 'Submitting subscription...'}
          {isSuccess && 'Subscription successful!'}
        </div>
      </form>
    </div>
  );
}
