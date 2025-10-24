/**
 * Input Validation and Sanitization Utilities
 *
 * Security utilities for validating and sanitizing user input
 * to prevent XSS, SQL injection, and other attacks.
 */

import { z } from 'zod';

/**
 * HTML entity encoding map
 */
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

/**
 * Sanitize HTML to prevent XSS attacks
 * Encodes all HTML special characters
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input.replace(/[&<>"'\/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Sanitize input for SQL queries
 * Note: Use parameterized queries instead when possible
 */
export function sanitizeSql(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove or escape dangerous SQL characters
  return input
    .replace(/'/g, "''") // Escape single quotes
    .replace(/;/g, '') // Remove semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove block comment start
    .replace(/\*\//g, ''); // Remove block comment end
}

/**
 * Sanitize email address
 * Ensures email is in valid format and removes dangerous characters
 */
export function sanitizeEmail(email: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove whitespace and convert to lowercase
  let sanitized = email.trim().toLowerCase();

  // Remove any characters not typically allowed in emails
  sanitized = sanitized.replace(/[^a-z0-9@._+-]/g, '');

  return sanitized;
}

/**
 * Sanitize phone number
 * Removes all non-numeric characters except + for country code
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') {
    return '';
  }

  // Keep only digits, plus sign, and hyphens
  return phone.replace(/[^\d+\-() ]/g, '').trim();
}

/**
 * Sanitize URL to prevent javascript: protocol and other attacks
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') {
    return '';
  }

  const sanitized = url.trim();

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
  const lowerUrl = sanitized.toLowerCase();

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '';
    }
  }

  return sanitized;
}

/**
 * Sanitize general text input
 * Removes control characters and limits length
 */
export function sanitizeText(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return '';
  }

  let sanitized = input
    // Remove control characters except newline and tab
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Deep sanitize object
 * Recursively sanitizes all string values in an object
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  options: {
    html?: boolean;
    sql?: boolean;
    maxLength?: number;
  } = {}
): T {
  const { html = true, sql = false, maxLength = 1000 } = options;

  const sanitized: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      let sanitizedValue = sanitizeText(value, maxLength);

      if (html) {
        sanitizedValue = sanitizeHtml(sanitizedValue);
      }

      if (sql) {
        sanitizedValue = sanitizeSql(sanitizedValue);
      }

      sanitized[key] = sanitizedValue;
    } else if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      sanitized[key] = sanitizeObject(value, options);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

/**
 * Validate and sanitize API request body
 */
export function validateRequestBody<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  options?: {
    sanitize?: boolean;
    sanitizeOptions?: Parameters<typeof sanitizeObject>[1];
  }
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    // Sanitize if requested
    let processedData = data;
    if (options?.sanitize && typeof data === 'object' && data !== null) {
      processedData = sanitizeObject(
        data as Record<string, any>,
        options.sanitizeOptions
      );
    }

    // Validate with schema
    const result = schema.safeParse(processedData);

    if (result.success) {
      return { success: true, data: result.data };
    }

    // Extract error messages
    const errors = result.error.errors.map(
      (err) => `${err.path.join('.')}: ${err.message}`
    );

    return { success: false, errors };
  } catch (error) {
    return {
      success: false,
      errors: ['Invalid request body format'],
    };
  }
}

/**
 * Check if string contains potential XSS
 */
export function containsXss(input: string): boolean {
  if (typeof input !== 'string') {
    return false;
  }

  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // Event handlers like onclick=
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ];

  return xssPatterns.some((pattern) => pattern.test(input));
}

/**
 * Check if string contains potential SQL injection
 */
export function containsSqlInjection(input: string): boolean {
  if (typeof input !== 'string') {
    return false;
  }

  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(UNION\s+SELECT)/gi,
    /(;\s*(DROP|DELETE|UPDATE))/gi,
    /--/,
    /\/\*/,
  ];

  return sqlPatterns.some((pattern) => pattern.test(input));
}
