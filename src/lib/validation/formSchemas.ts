/**
 * Form Validation Schemas
 *
 * Zod schemas for all landing page forms with comprehensive validation rules.
 * These schemas provide runtime validation and automatic TypeScript type inference.
 */

import { z } from 'zod';

/**
 * Email validation regex
 * Validates standard email format
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Phone validation regex
 * Accepts various phone formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
 */
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

/**
 * Newsletter Form Schema
 * Simple email-only subscription form
 */
export const newsletterFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Please enter a valid email address')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
});

/**
 * Signup Form Schema
 * Basic signup form with email, name, and optional fields
 */
export const signupFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Please enter a valid email address')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),

  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(
      /^[a-zA-Z\s\-\']+$/,
      'Full name can only contain letters, spaces, hyphens, and apostrophes'
    ),

  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  source: z
    .string()
    .max(100, 'Source must be less than 100 characters')
    .optional()
    .or(z.literal('')),
});

/**
 * Demo Form Schema
 * Extended signup form with phone and company size for demo requests
 */
export const demoFormSchema = signupFormSchema.extend({
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .max(20, 'Phone number must be less than 20 characters')
    .optional()
    .or(z.literal('')),

  companySize: z
    .enum(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'], {
      message: 'Please select a valid company size',
    })
    .optional()
    .or(z.literal('')),
});

/**
 * Type exports for convenience
 */
export type NewsletterFormInput = z.infer<typeof newsletterFormSchema>;
export type SignupFormInput = z.infer<typeof signupFormSchema>;
export type DemoFormInput = z.infer<typeof demoFormSchema>;

/**
 * Helper function to get validation error messages
 */
export function getFormErrors(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  error.issues.forEach((err) => {
    const path = err.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(err.message);
  });

  return errors;
}

/**
 * Helper function to validate form data
 */
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string[]> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, errors: getFormErrors(result.error) };
}
