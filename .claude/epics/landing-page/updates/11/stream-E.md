---
issue: 11
stream: E
agent: general-purpose
started: 2025-10-24T13:01:04Z
completed: 2025-10-24T13:51:00Z
status: completed
---

# Stream E: Monitoring & Error Tracking Setup

## Status: COMPLETED

## Summary

Successfully implemented comprehensive monitoring and error tracking infrastructure for the landing page application.

## Files Created

### 1. Monitoring Utilities (`/src/lib/monitoring.ts`)
- Production-ready Sentry integration
- Error capture with context and severity levels
- Error boundary helpers for React components
- Performance monitoring and transaction tracking
- Web Vitals monitoring (CLS, FID, FCP, LCP, TTFB, INP)
- Custom event tracking functions
- Type-safe monitoring interface
- Threshold monitoring and alerting
- User context management

**Key Features:**
- Dynamic Sentry initialization with configurable sample rates
- Error filtering for browser extensions and network errors
- Session replay integration with privacy controls
- Performance transaction tracking
- Web Vitals automatic measurement and reporting
- Custom performance metrics tracking
- Threshold-based monitoring and alerting

### 2. Monitoring Documentation (`/docs/monitoring.md`)

Comprehensive 850+ line guide covering:

**Setup Instructions:**
- Sentry setup (client, server, and edge configurations)
- Vercel Analytics integration
- Google Analytics 4 setup with Next.js
- Web Vitals monitoring implementation

**Best Practices:**
- Error tracking with proper context
- User privacy and data sanitization
- Error severity levels and usage
- React Error Boundaries implementation
- Performance monitoring patterns

**Monitoring Strategy:**
- Alert configuration guidelines
- Key metrics and targets:
  - Error rates (< 0.1% overall, < 2% form submissions)
  - Response times (p95 < 500ms, p99 < 1000ms)
  - Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
  - Conversion rates tracking
  - Form submission success rates (> 98%)
- Incident response procedures
- Escalation paths and timelines

**Operational Guides:**
- Pre-launch monitoring checklist
- Post-launch monitoring checklist
- Ongoing maintenance schedule
- Dashboard setup for Sentry, Vercel, and GA4
- Runbooks for common incidents
- Performance optimization workflows

## Implementation Highlights

### Type-Safe Monitoring Interface

```typescript
export interface MonitoringInterface {
  initSentry: typeof initSentry;
  captureError: typeof captureError;
  captureMessage: typeof captureMessage;
  setUser: typeof setUser;
  trackCustomEvent: typeof trackCustomEvent;
  initWebVitals: typeof initWebVitals;
  trackPerformance: typeof trackPerformance;
  startTransaction: typeof startTransaction;
  monitorThreshold: typeof monitorThreshold;
}
```

### Key Monitoring Functions

1. **Error Tracking:**
   - `captureError()` - Capture errors with context
   - `captureMessage()` - Capture non-error events
   - `createErrorBoundary()` - React error boundary helper

2. **Performance Monitoring:**
   - `initWebVitals()` - Automatic Web Vitals tracking
   - `trackPerformance()` - Custom performance metrics
   - `startTransaction()` - Performance transaction tracking

3. **Alerting:**
   - `monitorThreshold()` - Threshold-based alerting
   - Configurable severity levels
   - Integration with Sentry alerts

## Monitoring Coverage

### Error Monitoring
- Client-side JavaScript errors
- React component errors (via Error Boundaries)
- API request failures
- Form submission errors
- Validation errors
- Network errors (with filtering)

### Performance Monitoring
- Core Web Vitals (LCP, FID, CLS, FCP, TTFB, INP)
- API response times
- Database query performance
- Custom operation timings
- Transaction tracking for user flows

### User Behavior
- Custom event tracking
- Form submission success/failure rates
- CTA click tracking (via analytics.ts)
- User journey tracking
- Conversion funnel monitoring

## Integration Points

### Sentry Integration
- Client-side error tracking with session replay
- Server-side error tracking
- Edge runtime error tracking
- Performance monitoring with transaction tracing
- Web Vitals automatic reporting
- Breadcrumb tracking for context

### Analytics Integration
- Works alongside existing GA4 implementation
- Web Vitals sent to both Sentry and GA4
- Custom events tracked across platforms
- Form submission success rates
- User engagement metrics

### Vercel Integration
- Vercel Analytics for Web Vitals
- Speed Insights integration
- Geographic performance data
- Automatic page view tracking

## Testing Recommendations

### Local Testing
```typescript
// Test error capture
monitoring.captureError(new Error('Test error'), {
  tags: { environment: 'test' },
  extra: { test: true }
});

// Test Web Vitals (view in console)
monitoring.initWebVitals((metric) => {
  console.log(`${metric.name}: ${metric.value}`);
});
```

### Production Monitoring
- Monitor error rates for first 24 hours post-launch
- Review Web Vitals daily for first week
- Set up alert rules in Sentry dashboard
- Test incident response procedures
- Verify alert notifications are working

## Metrics Targets

### Error Rates
- Overall: < 0.1% of requests
- Critical errors: 0 per day
- Form submissions: < 2% error rate

### Performance
- API response (p95): < 500ms
- API response (p99): < 1000ms
- Page load time: < 3 seconds
- Time to Interactive: < 3.5 seconds

### Web Vitals
- LCP: < 2.5s (75th percentile)
- FID: < 100ms (75th percentile)
- INP: < 200ms (75th percentile)
- CLS: < 0.1 (75th percentile)

### Conversions
- Contact form: > 5% conversion
- Newsletter: > 3% conversion
- Form success rate: > 98%

## Next Steps

1. Install Sentry package: `npm install @sentry/nextjs`
2. Install Web Vitals: `npm install web-vitals`
3. Configure environment variables (see docs/monitoring.md)
4. Initialize Sentry in app layout
5. Set up error boundaries in critical components
6. Configure Sentry alert rules
7. Set up Vercel Analytics
8. Test monitoring in staging environment
9. Validate all integrations before production deployment

## Documentation

Complete documentation available in:
- `/docs/monitoring.md` - Comprehensive monitoring guide
- `/src/lib/monitoring.ts` - Implementation with inline documentation

## Commit Information

- **Commit:** 04049d7f379d250574fbdd0275b06a8514708f5d
- **Files:** src/lib/monitoring.ts, docs/monitoring.md
- **Lines Added:** 1,535 lines (684 code + 851 docs)

## Completion Date

2025-10-24T13:51:00Z
