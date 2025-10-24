/**
 * useFormSubmit Hook
 *
 * A reusable custom hook for managing form submission state and logic.
 * Handles loading states, success/error states, and provides type-safe submission handling.
 */

import { useState, useCallback } from 'react';
import type { FormSubmissionState, FormSubmissionStatus } from '@/types/forms';

/**
 * Configuration options for useFormSubmit hook
 */
export interface UseFormSubmitOptions {
  /**
   * Callback to execute on successful submission
   */
  onSuccess?: (data?: any) => void;

  /**
   * Callback to execute on failed submission
   */
  onError?: (error: Error) => void;

  /**
   * Duration in milliseconds to show success message before resetting
   * @default 3000
   */
  successDuration?: number;

  /**
   * Whether to reset the form state after successful submission
   * @default true
   */
  resetOnSuccess?: boolean;

  /**
   * Custom success message
   */
  successMessage?: string;

  /**
   * Custom error message
   */
  errorMessage?: string;
}

/**
 * Submit function type
 * Generic function that accepts form data and returns a promise
 */
export type SubmitFunction<TData> = (data: TData) => Promise<void | any>;

/**
 * Return type for useFormSubmit hook
 */
export interface UseFormSubmitReturn<TData> {
  /**
   * Current submission state
   */
  state: FormSubmissionState;

  /**
   * Whether the form is currently submitting
   */
  isSubmitting: boolean;

  /**
   * Whether the form submission was successful
   */
  isSuccess: boolean;

  /**
   * Whether the form submission resulted in an error
   */
  isError: boolean;

  /**
   * Whether the form is idle (not submitted yet)
   */
  isIdle: boolean;

  /**
   * Handle form submission
   */
  handleSubmit: (data: TData) => Promise<void>;

  /**
   * Reset the form state to idle
   */
  reset: () => void;

  /**
   * Set a custom error message
   */
  setError: (message: string, errors?: Record<string, string[]>) => void;

  /**
   * Set a custom success message
   */
  setSuccess: (message?: string) => void;
}

/**
 * Custom hook for managing form submission state and logic
 *
 * @template TData - The type of form data being submitted
 * @param submitFn - The async function to call when submitting the form
 * @param options - Configuration options for the hook
 * @returns Form submission state and handlers
 *
 * @example
 * ```tsx
 * const { handleSubmit, isSubmitting, isSuccess, state } = useFormSubmit(
 *   async (data) => {
 *     await api.submitForm(data);
 *   },
 *   {
 *     onSuccess: () => console.log('Form submitted!'),
 *     successMessage: 'Thank you for submitting!',
 *   }
 * );
 * ```
 */
export function useFormSubmit<TData = any>(
  submitFn: SubmitFunction<TData>,
  options: UseFormSubmitOptions = {}
): UseFormSubmitReturn<TData> {
  const {
    onSuccess,
    onError,
    successDuration = 3000,
    resetOnSuccess = true,
    successMessage = 'Form submitted successfully!',
    errorMessage = 'An error occurred. Please try again.',
  } = options;

  // State management
  const [state, setState] = useState<FormSubmissionState>({
    status: 'idle',
    message: undefined,
    errors: undefined,
  });

  /**
   * Reset form state to idle
   */
  const reset = useCallback(() => {
    setState({
      status: 'idle',
      message: undefined,
      errors: undefined,
    });
  }, []);

  /**
   * Set error state with custom message
   */
  const setError = useCallback(
    (message: string, errors?: Record<string, string[]>) => {
      setState({
        status: 'error',
        message,
        errors,
      });
    },
    []
  );

  /**
   * Set success state with custom message
   */
  const setSuccess = useCallback(
    (message?: string) => {
      setState({
        status: 'success',
        message: message || successMessage,
        errors: undefined,
      });
    },
    [successMessage]
  );

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (data: TData): Promise<void> => {
      // Set submitting state
      setState({
        status: 'submitting',
        message: undefined,
        errors: undefined,
      });

      try {
        // Execute the submit function
        const result = await submitFn(data);

        // Set success state
        setState({
          status: 'success',
          message: successMessage,
          errors: undefined,
        });

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(result);
        }

        // Auto-reset after success duration
        if (resetOnSuccess && successDuration > 0) {
          setTimeout(() => {
            setState({
              status: 'idle',
              message: undefined,
              errors: undefined,
            });
          }, successDuration);
        }
      } catch (error) {
        // Extract error message
        const errorMsg =
          error instanceof Error ? error.message : errorMessage;

        // Extract errors if available (e.g., from API validation)
        let errors: Record<string, string[]> | undefined;
        if (
          error &&
          typeof error === 'object' &&
          'errors' in error &&
          error.errors
        ) {
          errors = error.errors as Record<string, string[]>;
        }

        // Set error state
        setState({
          status: 'error',
          message: errorMsg,
          errors,
        });

        // Call error callback if provided
        if (onError && error instanceof Error) {
          onError(error);
        }
      }
    },
    [
      submitFn,
      onSuccess,
      onError,
      successDuration,
      resetOnSuccess,
      successMessage,
      errorMessage,
    ]
  );

  // Derived state values for convenience
  const isSubmitting = state.status === 'submitting';
  const isSuccess = state.status === 'success';
  const isError = state.status === 'error';
  const isIdle = state.status === 'idle';

  return {
    state,
    isSubmitting,
    isSuccess,
    isError,
    isIdle,
    handleSubmit,
    reset,
    setError,
    setSuccess,
  };
}

/**
 * Error handling utility for form submissions
 * Extracts user-friendly error messages from various error types
 */
export function getFormErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Utility to check if an error response contains validation errors
 */
export function hasValidationErrors(
  error: unknown
): error is { errors: Record<string, string[]> } {
  return (
    error !== null &&
    typeof error === 'object' &&
    'errors' in error &&
    typeof error.errors === 'object' &&
    error.errors !== null
  );
}
