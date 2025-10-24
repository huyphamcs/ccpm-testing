/**
 * Email Templates
 *
 * HTML and plain text email templates for all form types
 */

export interface EmailTemplateData {
  name?: string;
  email: string;
  company?: string;
  companySize?: string;
  message?: string;
}

/**
 * Signup confirmation email template
 */
export function getSignupEmail(data: EmailTemplateData): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: 'Welcome! Your signup is confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome to Our Platform!</h1>
        <p>Hi ${data.name || 'there'},</p>
        <p>Thank you for signing up. We're excited to have you on board!</p>
        <p>Your email <strong>${data.email}</strong> has been confirmed.</p>
        <p>Best regards,<br/>The Team</p>
      </div>
    `,
    text: `
      Welcome to Our Platform!

      Hi ${data.name || 'there'},

      Thank you for signing up. We're excited to have you on board!
      Your email ${data.email} has been confirmed.

      Best regards,
      The Team
    `,
  };
}

/**
 * Demo request confirmation email (to user)
 */
export function getDemoConfirmationEmail(data: EmailTemplateData): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: 'Demo Request Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Demo Request Received</h1>
        <p>Hi ${data.name},</p>
        <p>We've received your demo request and our team will contact you shortly.</p>
        <p><strong>Your Details:</strong></p>
        <ul>
          <li>Email: ${data.email}</li>
          <li>Company: ${data.company || 'N/A'}</li>
          <li>Company Size: ${data.companySize || 'N/A'}</li>
        </ul>
        <p>Best regards,<br/>The Team</p>
      </div>
    `,
    text: `
      Demo Request Received

      Hi ${data.name},

      We've received your demo request and our team will contact you shortly.

      Your Details:
      - Email: ${data.email}
      - Company: ${data.company || 'N/A'}
      - Company Size: ${data.companySize || 'N/A'}

      Best regards,
      The Team
    `,
  };
}

/**
 * Demo request notification email (to sales team)
 */
export function getDemoNotificationEmail(data: EmailTemplateData): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: `New Demo Request from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">New Demo Request</h1>
        <p><strong>Contact Details:</strong></p>
        <ul>
          <li>Name: ${data.name}</li>
          <li>Email: ${data.email}</li>
          <li>Company: ${data.company || 'N/A'}</li>
          <li>Company Size: ${data.companySize || 'N/A'}</li>
        </ul>
        ${data.message ? `<p><strong>Message:</strong><br/>${data.message}</p>` : ''}
        <p>Follow up as soon as possible!</p>
      </div>
    `,
    text: `
      New Demo Request

      Contact Details:
      - Name: ${data.name}
      - Email: ${data.email}
      - Company: ${data.company || 'N/A'}
      - Company Size: ${data.companySize || 'N/A'}

      ${data.message ? `Message:\n${data.message}\n` : ''}
      Follow up as soon as possible!
    `,
  };
}

/**
 * Newsletter subscription confirmation
 */
export function getNewsletterEmail(data: EmailTemplateData): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: 'Newsletter Subscription Confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">You're Subscribed!</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>We'll keep you updated with our latest news and insights at <strong>${data.email}</strong>.</p>
        <p>Best regards,<br/>The Team</p>
      </div>
    `,
    text: `
      You're Subscribed!

      Thank you for subscribing to our newsletter.
      We'll keep you updated with our latest news and insights at ${data.email}.

      Best regards,
      The Team
    `,
  };
}
