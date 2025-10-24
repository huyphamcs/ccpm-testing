/**
 * Email Service Configuration
 *
 * Multi-provider email configuration with fallback support
 */

export interface EmailProvider {
  name: string;
  apiKey?: string;
  endpoint?: string;
  from?: string;
  enabled: boolean;
}

export interface EmailConfig {
  primary: EmailProvider;
  backup: EmailProvider;
  fallback: EmailProvider;
  retryAttempts: number;
  retryDelay: number;
}

/**
 * Get email configuration from environment variables
 */
export function getEmailConfig(): EmailConfig {
  return {
    primary: {
      name: 'Resend',
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      enabled: Boolean(process.env.RESEND_API_KEY),
    },
    backup: {
      name: 'SendGrid',
      apiKey: process.env.SENDGRID_API_KEY,
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      enabled: Boolean(process.env.SENDGRID_API_KEY),
    },
    fallback: {
      name: 'Formspree',
      endpoint: process.env.FORMSPREE_ENDPOINT,
      enabled: Boolean(process.env.FORMSPREE_ENDPOINT),
    },
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  };
}

/**
 * Validate email configuration
 */
export function validateEmailConfig(config: EmailConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.primary.enabled && !config.backup.enabled && !config.fallback.enabled) {
    errors.push('No email providers configured');
  }

  if (config.primary.enabled && !config.primary.apiKey) {
    errors.push('Primary provider API key missing');
  }

  if (config.backup.enabled && !config.backup.apiKey) {
    errors.push('Backup provider API key missing');
  }

  if (config.fallback.enabled && !config.fallback.endpoint) {
    errors.push('Fallback provider endpoint missing');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
