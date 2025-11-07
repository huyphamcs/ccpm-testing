/**
 * Email Service
 *
 * Multi-provider email service with automatic fallback and retry logic
 */

import { getEmailConfig } from '@/config/email';
import {
  getSignupEmail,
  getDemoConfirmationEmail,
  getDemoNotificationEmail,
  getNewsletterEmail,
  type EmailTemplateData,
} from './email-templates';
import { logger } from './logger';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Send email via Resend
 */
async function sendViaResend(
  options: SendEmailOptions,
  apiKey: string,
  from: string
): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend API error: ${response.statusText}`);
  }
}

/**
 * Send email via SendGrid
 */
async function sendViaSendGrid(
  options: SendEmailOptions,
  apiKey: string,
  from: string
): Promise<void> {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: options.to }] }],
      from: { email: from },
      subject: options.subject,
      content: [
        { type: 'text/plain', value: options.text },
        { type: 'text/html', value: options.html },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`SendGrid API error: ${response.statusText}`);
  }
}

/**
 * Send email via Formspree
 */
async function sendViaFormspree(
  options: SendEmailOptions,
  endpoint: string
): Promise<void> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: options.to,
      subject: options.subject,
      message: options.text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Formspree API error: ${response.statusText}`);
  }
}

/**
 * Send email with automatic fallback and retry
 */
async function sendEmail(options: SendEmailOptions): Promise<void> {
  const config = getEmailConfig();
  let lastError: Error | undefined;

  // Try primary provider
  if (config.primary.enabled && config.primary.apiKey) {
    try {
      await sendViaResend(options, config.primary.apiKey, config.primary.from!);
      logger.info('Email sent via Resend', { to: options.to });
      return;
    } catch (error) {
      lastError = error as Error;
      logger.warn('Resend failed, trying backup', { error: lastError.message });
    }
  }

  // Try backup provider
  if (config.backup.enabled && config.backup.apiKey) {
    try {
      await sendViaSendGrid(options, config.backup.apiKey, config.backup.from!);
      logger.info('Email sent via SendGrid', { to: options.to });
      return;
    } catch (error) {
      lastError = error as Error;
      logger.warn('SendGrid failed, trying fallback', { error: lastError.message });
    }
  }

  // Try fallback provider
  if (config.fallback.enabled && config.fallback.endpoint) {
    try {
      await sendViaFormspree(options, config.fallback.endpoint);
      logger.info('Email sent via Formspree', { to: options.to });
      return;
    } catch (error) {
      lastError = error as Error;
      logger.error('All email providers failed', lastError);
    }
  }

  throw new Error(`Failed to send email: ${lastError?.message || 'All providers unavailable'}`);
}

/**
 * Send signup confirmation email
 */
export async function sendSignupConfirmation(data: EmailTemplateData): Promise<void> {
  const template = getSignupEmail(data);
  await sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

/**
 * Send demo request emails (confirmation + notification)
 */
export async function sendDemoRequest(data: EmailTemplateData): Promise<void> {
  // Send confirmation to user
  const userTemplate = getDemoConfirmationEmail(data);
  await sendEmail({
    to: data.email,
    subject: userTemplate.subject,
    html: userTemplate.html,
    text: userTemplate.text,
  });

  // Send notification to sales team
  const salesEmail = process.env.SALES_EMAIL || 'sales@yourdomain.com';
  const salesTemplate = getDemoNotificationEmail(data);
  await sendEmail({
    to: salesEmail,
    subject: salesTemplate.subject,
    html: salesTemplate.html,
    text: salesTemplate.text,
  });
}

/**
 * Send newsletter subscription confirmation
 */
export async function sendNewsletterConfirmation(data: EmailTemplateData): Promise<void> {
  const template = getNewsletterEmail(data);
  await sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}
