# Monitoring & Error Tracking Setup Guide

This guide covers the setup and configuration of monitoring, error tracking, and analytics for the landing page application.

## Table of Contents

- [Overview](#overview)
- [Sentry Setup](#sentry-setup)
- [Vercel Analytics](#vercel-analytics)
- [Google Analytics 4](#google-analytics-4)
- [Web Vitals Monitoring](#web-vitals-monitoring)
- [Error Tracking Best Practices](#error-tracking-best-practices)
- [Performance Monitoring](#performance-monitoring)
- [Alert Configuration](#alert-configuration)
- [Key Metrics](#key-metrics)
- [Incident Response](#incident-response)
- [Monitoring Checklist](#monitoring-checklist)

## Overview

Our monitoring stack consists of:

- **Sentry**: Error tracking and performance monitoring
- **Vercel Analytics**: Web vitals and user experience metrics
- **Google Analytics 4**: User behavior and conversion tracking
- **Custom Monitoring**: Application-specific metrics and events

## Sentry Setup

### 1. Installation

```bash
npm install @sentry/nextjs
```

### 2. Initialize Sentry

Create `sentry.client.config.ts` in your project root:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% when errors occur

  // Integrations
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Error filtering
  beforeSend(event, hint) {
    // Filter browser extension errors
    if (event.exception?.values?.[0]?.value?.includes('chrome-extension://')) {
      return null;
    }
    return event;
  },
});
```

Create `sentry.server.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
});
```

Create `sentry.edge.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
});
```

### 3. Environment Variables

Add to `.env.local`:

```bash
# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id
SENTRY_AUTH_TOKEN=your-auth-token
SENTRY_ORG=your-organization
SENTRY_PROJECT=your-project
```

### 4. Usage in Application

```typescript
import { monitoring } from '@/lib/monitoring';

// Initialize on app startup
useEffect(() => {
  monitoring.initSentry({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN!,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enabled: process.env.NODE_ENV === 'production',
  });
}, []);

// Capture errors
try {
  await riskyOperation();
} catch (error) {
  monitoring.captureError(error, {
    tags: { operation: 'form-submit' },
    extra: { formId: 'contact-form' },
    level: 'error',
  });
}

// Track user context
monitoring.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});
```

## Vercel Analytics

### 1. Installation

```bash
npm install @vercel/analytics
```

### 2. Setup

In your root layout (`app/layout.tsx`):

```typescript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 3. Configuration

No additional configuration needed. Vercel Analytics automatically:
- Tracks page views
- Monitors Web Vitals
- Records user interactions
- Provides geographic data

## Google Analytics 4

### 1. Setup with Next.js

Using `@next/third-parties`:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
```

### 2. Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Custom Event Tracking

```typescript
import { trackEvent, trackCTAClick, trackFormSubmit } from '@/lib/analytics';

// Track CTA clicks
trackCTAClick({
  cta_location: 'hero',
  cta_text: 'Get Started',
  cta_url: '/signup',
});

// Track form submissions
trackFormSubmit({
  form_name: 'contact',
  form_location: 'footer',
  success: true,
});

// Track custom events
trackEvent('feature_used', {
  feature_name: 'dark_mode',
  user_type: 'free',
});
```

## Web Vitals Monitoring

### 1. Core Web Vitals

Monitor the key metrics that Google uses for page experience:

- **LCP (Largest Contentful Paint)**: Loading performance
  - Good: < 2.5s
  - Needs Improvement: 2.5s - 4.0s
  - Poor: > 4.0s

- **FID (First Input Delay)** / **INP (Interaction to Next Paint)**: Interactivity
  - Good: < 100ms (FID) / < 200ms (INP)
  - Needs Improvement: 100-300ms / 200-500ms
  - Poor: > 300ms / > 500ms

- **CLS (Cumulative Layout Shift)**: Visual stability
  - Good: < 0.1
  - Needs Improvement: 0.1 - 0.25
  - Poor: > 0.25

### 2. Implementation

```typescript
import { monitoring } from '@/lib/monitoring';

useEffect(() => {
  monitoring.initWebVitals((metric) => {
    console.log(`${metric.name}: ${metric.value} (${metric.rating})`);

    // Send to analytics
    trackEvent('web_vitals', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
    });

    // Alert if poor
    if (metric.rating === 'poor') {
      monitoring.captureMessage(`Poor ${metric.name}: ${metric.value}`, 'warning', {
        tags: { type: 'web_vitals', metric: metric.name },
        extra: { value: metric.value, rating: metric.rating },
      });
    }
  });
}, []);
```

### 3. Monitoring in Next.js

Add to `app/layout.tsx`:

```typescript
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Send to Sentry
    if (window.Sentry) {
      window.Sentry.setMeasurement(
        metric.name,
        metric.value,
        metric.name === 'CLS' ? 'none' : 'millisecond'
      );
    }
  });

  return null;
}
```

## Error Tracking Best Practices

### 1. Error Context

Always provide context when capturing errors:

```typescript
monitoring.captureError(error, {
  tags: {
    component: 'ContactForm',
    action: 'submit',
    user_type: 'anonymous',
  },
  extra: {
    form_data: sanitizedFormData,
    validation_errors: validationErrors,
    timestamp: new Date().toISOString(),
  },
  level: 'error',
});
```

### 2. User Privacy

Never log sensitive information:

```typescript
// BAD - Don't do this
monitoring.captureError(error, {
  extra: {
    password: user.password, // NEVER!
    credit_card: user.card,  // NEVER!
  },
});

// GOOD - Sanitize data
const sanitizedData = {
  email: user.email.replace(/(.{2}).*(@.*)/, '$1***$2'),
  hasPassword: !!user.password,
  cardLast4: user.card?.slice(-4),
};

monitoring.captureError(error, {
  extra: sanitizedData,
});
```

### 3. Error Severity Levels

Use appropriate severity levels:

```typescript
// Fatal: Application cannot continue
monitoring.captureError(error, { level: 'fatal' });

// Error: Operation failed, but app continues
monitoring.captureError(error, { level: 'error' });

// Warning: Unexpected behavior, degraded experience
monitoring.captureMessage('Rate limit approaching', 'warning');

// Info: Informational messages
monitoring.captureMessage('User completed onboarding', 'info');

// Debug: Debugging information
monitoring.captureMessage('Cache miss', 'debug');
```

### 4. Error Boundaries

Implement error boundaries for React components:

```typescript
import { Component, ReactNode } from 'react';
import { monitoring } from '@/lib/monitoring';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    monitoring.captureError(error, {
      tags: { errorBoundary: 'true' },
      extra: { componentStack: errorInfo.componentStack },
      level: 'error',
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}
```

## Performance Monitoring

### 1. Transaction Tracking

Track user flows and operations:

```typescript
const transaction = monitoring.startTransaction('checkout-flow', 'user-interaction');

try {
  transaction.setData('items_count', cart.items.length);
  transaction.setData('total_amount', cart.total);

  await processCheckout(cart);

  transaction.setStatus('ok');
} catch (error) {
  transaction.setStatus('error');
  monitoring.captureError(error);
  throw error;
} finally {
  transaction.finish();
}
```

### 2. Custom Performance Metrics

Track operation durations:

```typescript
const startTime = performance.now();

await fetchData();

const duration = performance.now() - startTime;
monitoring.trackPerformance('api_fetch_duration', duration, 'millisecond');

// Alert if slow
if (duration > 1000) {
  monitoring.monitorThreshold('api_response_time', duration, 1000, 'greater');
}
```

### 3. Database Query Monitoring

Track database performance:

```typescript
async function queryDatabase(sql: string) {
  const transaction = monitoring.startTransaction('database-query', 'db.query');
  const startTime = performance.now();

  try {
    const result = await db.query(sql);
    const duration = performance.now() - startTime;

    transaction.setData('query', sql);
    transaction.setData('duration', duration);
    transaction.setData('rows', result.length);
    transaction.setStatus('ok');

    if (duration > 500) {
      monitoring.captureMessage('Slow database query', 'warning', {
        extra: { sql, duration, rows: result.length },
      });
    }

    return result;
  } catch (error) {
    transaction.setStatus('error');
    throw error;
  } finally {
    transaction.finish();
  }
}
```

## Alert Configuration

### 1. Sentry Alerts

Configure alerts in Sentry dashboard:

**Error Rate Alert:**
- Condition: Error count > 50 in 1 hour
- Action: Email team, Slack notification

**Performance Alert:**
- Condition: Transaction duration p95 > 3 seconds
- Action: Email on-call engineer

**Custom Alert:**
- Condition: Form submission failures > 10% in 1 hour
- Action: Page on-call, create incident

### 2. Custom Threshold Monitoring

Implement in code:

```typescript
// Monitor error rates
const errorRate = (errors / total) * 100;
monitoring.monitorThreshold('error_rate', errorRate, 5, 'greater');

// Monitor response times
monitoring.monitorThreshold('api_response_time', duration, 1000, 'greater');

// Monitor conversion rates
monitoring.monitorThreshold('conversion_rate', conversionRate, 2, 'less');
```

### 3. Uptime Monitoring

Use external services:
- **UptimeRobot**: Free monitoring, 5-minute intervals
- **Pingdom**: Comprehensive monitoring with alerting
- **StatusCake**: Global monitoring with performance tracking

## Key Metrics

### 1. Error Rates

Monitor error frequency and trends:

```typescript
// Track error rate by type
monitoring.trackCustomEvent({
  category: 'errors',
  action: 'error_occurred',
  label: error.name,
  value: 1,
  metadata: {
    component: componentName,
    user_type: userType,
  },
});
```

**Target Metrics:**
- Overall error rate: < 0.1% of requests
- Critical errors: 0 per day
- Form submission errors: < 2%

### 2. Response Times

Track API and page load times:

**Target Metrics:**
- API response time (p95): < 500ms
- API response time (p99): < 1000ms
- Page load time: < 3 seconds
- Time to Interactive: < 3.5 seconds

### 3. Web Vitals

Monitor Core Web Vitals:

**Target Metrics:**
- LCP: < 2.5 seconds (75th percentile)
- FID/INP: < 100ms / < 200ms
- CLS: < 0.1

### 4. Conversion Rates

Track user actions and conversions:

```typescript
// Track form submissions
const submissionRate = (submissions / views) * 100;
monitoring.trackCustomEvent({
  category: 'conversions',
  action: 'form_submission_rate',
  value: submissionRate,
});
```

**Target Metrics:**
- Contact form submission: > 5%
- Newsletter signup: > 3%
- CTA click-through: > 10%
- Bounce rate: < 40%

### 5. Form Submission Success Rates

Monitor form reliability:

```typescript
const successRate = (successful / total) * 100;

if (successRate < 95) {
  monitoring.captureMessage('Low form success rate', 'warning', {
    tags: { type: 'conversion_alert' },
    extra: { successRate, total, successful },
  });
}
```

**Target Metrics:**
- Form submission success: > 98%
- Validation error rate: < 5%
- Server error rate: < 0.5%

## Incident Response

### 1. Incident Severity Levels

**P0 - Critical:**
- Site down or major functionality broken
- Response time: Immediate
- Resolution time: < 1 hour

**P1 - High:**
- Significant feature degradation
- Response time: < 30 minutes
- Resolution time: < 4 hours

**P2 - Medium:**
- Minor feature issues, workaround available
- Response time: < 2 hours
- Resolution time: < 24 hours

**P3 - Low:**
- Cosmetic issues, minimal impact
- Response time: < 1 day
- Resolution time: < 1 week

### 2. Incident Response Workflow

1. **Detection**
   - Automated alerts from monitoring
   - User reports
   - Manual discovery

2. **Assessment**
   - Determine severity
   - Identify affected users
   - Estimate business impact

3. **Response**
   - Assign incident owner
   - Create incident channel (Slack)
   - Notify stakeholders
   - Begin investigation

4. **Mitigation**
   - Implement temporary fix
   - Roll back if necessary
   - Monitor metrics

5. **Resolution**
   - Deploy permanent fix
   - Verify resolution
   - Update monitoring

6. **Post-Mortem**
   - Document incident
   - Identify root cause
   - Create action items
   - Update runbooks

### 3. Escalation Procedures

**Escalation Chain:**
1. On-call engineer (0-15 minutes)
2. Engineering lead (15-30 minutes)
3. Engineering manager (30-60 minutes)
4. VP Engineering (> 60 minutes, P0 only)

**Communication:**
- Update status page every 30 minutes
- Post in incident channel every 15 minutes
- Notify customers for P0/P1 incidents

### 4. Runbooks

Create runbooks for common incidents:

**High Error Rate:**
```markdown
1. Check Sentry for error details
2. Identify affected endpoints/components
3. Check recent deployments
4. Review error logs for patterns
5. If deployment-related: rollback
6. If third-party: check service status
7. Implement fix and deploy
8. Monitor error rate for 1 hour
```

**Slow Performance:**
```markdown
1. Check Vercel Analytics for affected pages
2. Review Sentry performance data
3. Check database query performance
4. Identify resource bottlenecks
5. Implement caching if applicable
6. Optimize slow queries
7. Monitor Web Vitals for improvement
```

**Form Submission Failures:**
```markdown
1. Check form submission success rate
2. Review validation error patterns
3. Test form manually in production
4. Check API endpoint status
5. Verify email service availability
6. Review recent code changes
7. Fix validation or API issues
8. Notify affected users if needed
```

## Monitoring Checklist

### Pre-Launch Checklist

- [ ] Sentry installed and configured
- [ ] Sentry DSN added to environment variables
- [ ] Vercel Analytics enabled
- [ ] Google Analytics 4 configured
- [ ] Web Vitals monitoring implemented
- [ ] Error boundaries added to critical components
- [ ] Performance monitoring set up
- [ ] Custom event tracking implemented
- [ ] Alert rules configured in Sentry
- [ ] Uptime monitoring configured
- [ ] Status page created
- [ ] Incident response procedures documented
- [ ] On-call rotation established
- [ ] Runbooks created for common issues

### Post-Launch Checklist

- [ ] Monitor error rates daily for first week
- [ ] Review Web Vitals weekly
- [ ] Check alert configurations are working
- [ ] Test incident response procedures
- [ ] Review and update performance baselines
- [ ] Analyze user behavior in GA4
- [ ] Optimize based on monitoring data
- [ ] Document any new error patterns
- [ ] Update runbooks with learnings
- [ ] Schedule monthly monitoring review

### Ongoing Maintenance

- [ ] Weekly: Review error trends and patterns
- [ ] Weekly: Check Web Vitals performance
- [ ] Bi-weekly: Review alert configurations
- [ ] Monthly: Performance optimization review
- [ ] Monthly: Monitoring tools audit
- [ ] Quarterly: Incident response drill
- [ ] Quarterly: Update monitoring documentation
- [ ] Quarterly: Review and optimize sample rates

## Dashboard Setup

### 1. Sentry Dashboard

Create custom dashboards for:

**Error Monitoring:**
- Error rate over time
- Errors by component
- Errors by browser/device
- Error trends and patterns

**Performance:**
- Transaction duration (p50, p95, p99)
- Slow transactions
- Web Vitals trends
- Geographic performance

### 2. Vercel Analytics Dashboard

Monitor:
- Real-time visitors
- Page views and top pages
- Geographic distribution
- Device and browser breakdown
- Web Vitals scores

### 3. Google Analytics 4 Dashboard

Track:
- User acquisition
- User engagement
- Conversion events
- Custom event funnels
- Form submission success

## Resources

### Documentation

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Web Vitals](https://web.dev/vitals/)

### Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse): Performance auditing
- [WebPageTest](https://www.webpagetest.org/): Detailed performance analysis
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/): Browser debugging

### Support

- Sentry Support: support@sentry.io
- Vercel Support: Through dashboard
- Internal: #monitoring-alerts Slack channel

---

**Last Updated:** 2025-10-24
**Maintained By:** Engineering Team
**Review Schedule:** Quarterly
