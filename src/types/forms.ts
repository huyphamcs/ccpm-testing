/**
 * Form Types
 *
 * TypeScript type definitions for all landing page forms.
 * These types are inferred from Zod schemas to ensure type safety.
 */

import { z } from 'zod';
import {
  signupFormSchema,
  demoFormSchema,
  newsletterFormSchema
} from '@/lib/validation/formSchemas';

/**
 * Newsletter Form Data
 * Simple email-only subscription form
 */
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

/**
 * Signup Form Data
 * Basic signup with email, name, and optional company/source
 */
export type SignupFormData = z.infer<typeof signupFormSchema>;

/**
 * Demo Request Form Data
 * Extended signup form with phone and company size for demo requests
 */
export type DemoFormData = z.infer<typeof demoFormSchema>;

/**
 * Company Size Options
 * Predefined options for company size dropdown
 */
export const COMPANY_SIZE_OPTIONS = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1,000 employees' },
  { value: '1000+', label: '1,000+ employees' },
] as const;

/**
 * Form Submission Status
 * Track the state of form submissions
 */
export type FormSubmissionStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error';

/**
 * Form Submission State
 * Generic state management for form submissions
 */
export interface FormSubmissionState {
  status: FormSubmissionStatus;
  message?: string;
  errors?: Record<string, string[]>;
}
