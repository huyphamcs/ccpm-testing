---
issue: 7
title: API Routes & Backend Integration
analyzed: 2025-10-24T07:45:00Z
estimated_hours: 16
parallelization_factor: 2.0
---

# Parallel Work Analysis: Issue #7

## Overview
Implement secure API routes (/api/signup, /api/demo, /api/newsletter) with comprehensive security features including rate limiting, CSRF protection, input sanitization, and email service integration with Formspree fallback. This task establishes the backend infrastructure for handling user interactions from the landing page.

## Parallel Streams

### Stream A: Security Infrastructure
**Scope**: Rate limiting, CSRF protection, and input validation utilities
**Files**:
- `/src/lib/rate-limiter.ts`
- `/src/lib/validation.ts`
- `/src/middleware.ts`
**Agent Type**: backend-specialist
**Can Start**: immediately
**Estimated Hours**: 6
**Dependencies**: none

**Details**:
- Implement rate limiting system (redis or in-memory store, 10 req/min per IP)
- Create input validation utilities using express-validator or Zod
- Implement CSRF protection using next-csrf
- Create input sanitization functions (XSS/injection prevention)
- Set up middleware for security checks
- Configure CORS policies for API endpoints
- Error logging setup

### Stream B: Email Service Integration
**Scope**: Email service with Formspree fallback and email templates
**Files**:
- `/src/lib/email-service.ts`
- `/src/lib/email-templates.ts` (optional)
- `/src/config/email.ts` (optional)
**Agent Type**: backend-specialist
**Can Start**: immediately
**Estimated Hours**: 5
**Dependencies**: none

**Details**:
- Implement primary email service integration (SendGrid/Mailchimp/Resend)
- Create Formspree fallback mechanism
- Build email confirmation templates
- Implement graceful degradation between services
- Add retry logic for failed email sends
- Create email service abstraction layer
- Environment variable configuration
- Error handling for email failures

### Stream C: API Route - Signup
**Scope**: /api/signup endpoint implementation
**Files**:
- `/src/app/api/signup/route.ts`
**Agent Type**: backend-specialist
**Can Start**: after Stream A completes (needs validation and rate limiting)
**Estimated Hours**: 3
**Dependencies**: Stream A

**Details**:
- Implement POST /api/signup endpoint
- Integrate rate limiting middleware
- Server-side validation for email, name, company fields
- CSRF token validation
- Input sanitization
- Call email service to send confirmation
- Consistent JSON response format
- Appropriate HTTP status codes
- Error handling and logging

### Stream D: API Route - Demo Request
**Scope**: /api/demo endpoint implementation
**Files**:
- `/src/app/api/demo/route.ts`
**Agent Type**: backend-specialist
**Can Start**: after Stream A completes (needs validation and rate limiting)
**Estimated Hours**: 3
**Dependencies**: Stream A

**Details**:
- Implement POST /api/demo endpoint
- Integrate rate limiting middleware
- Server-side validation for all demo form fields (email, name, phone, company size)
- CSRF token validation
- Input sanitization
- Call email service to notify sales team
- Consistent JSON response format
- Appropriate HTTP status codes
- Error handling and logging

### Stream E: API Route - Newsletter
**Scope**: /api/newsletter endpoint implementation
**Files**:
- `/src/app/api/newsletter/route.ts`
**Agent Type**: backend-specialist
**Can Start**: after Stream A completes (needs validation and rate limiting)
**Estimated Hours**: 2
**Dependencies**: Stream A

**Details**:
- Implement POST /api/newsletter endpoint
- Integrate rate limiting middleware
- Server-side validation for email field
- CSRF token validation
- Input sanitization
- Add email to mailing list
- Consistent JSON response format
- Appropriate HTTP status codes
- Error handling and logging

## Coordination Points

### Shared Files
None - all streams work on independent files

### Sequential Requirements
1. **Phase 1**: Streams A & B can run in parallel (6h wall time)
   - Stream A: Security infrastructure (rate limiting, CSRF, validation)
   - Stream B: Email service integration
2. **Phase 2**: Streams C, D, E can run in parallel after Stream A completes (3h wall time)
   - Stream C: /api/signup endpoint
   - Stream D: /api/demo endpoint
   - Stream E: /api/newsletter endpoint
   - All three depend on Stream A's security utilities

### Integration Points
- All API routes (C, D, E) will import from Stream A (rate limiter, validation)
- API routes for signup and demo will use Stream B (email service)
- Newsletter route may integrate with external mailing list service

## Conflict Risk Assessment
- **Low Risk**: All streams work on different files
- No file overlap between any streams
- Clear dependency chain: (A, B) → (C, D, E)
- Stream B is independent and can be tested separately

## Parallelization Strategy

**Recommended Approach**: hybrid

1. **Phase 1 (Parallel)**: Launch Streams A & B simultaneously (6h wall time)
   - Stream A builds security infrastructure
   - Stream B builds email service integration
   - Both are foundational and independent of each other

2. **Phase 2 (Parallel)**: Launch Streams C, D, E after Phase 1 completes (3h wall time)
   - All three API routes can be implemented simultaneously
   - Each route is independent but uses Phase 1 utilities
   - Stream C & D will integrate with Stream B's email service

3. **Phase 3 (Integration)**: Testing and integration (2h)
   - End-to-end testing of all endpoints
   - Security verification (rate limiting, CSRF)
   - Email delivery confirmation

## Expected Timeline

With parallel execution:
- Phase 1 wall time: 6 hours (max of Streams A & B)
- Phase 2 wall time: 3 hours (max of Streams C, D, & E)
- Phase 3 integration: 2 hours
- **Total wall time: 11 hours**
- Total work: 16 hours (+ 3h integration = 19h)
- Efficiency gain: 42%

Without parallel execution:
- Wall time: 19 hours (sequential implementation)

## Notes

### Prerequisites
- Task #8 (Forms & Validation) must be completed before API routes are fully functional
- Email service credentials (SendGrid API key or similar) required
- Formspree account setup required for fallback
- Environment variables must be configured (.env.local)

### Environment Variables Required
```
# Primary email service
EMAIL_SERVICE_API_KEY=
EMAIL_FROM_ADDRESS=
EMAIL_TO_ADDRESS= # For demo notifications

# Formspree fallback
FORMSPREE_API_KEY=
FORMSPREE_FORM_ID=

# Security
CSRF_SECRET=
RATE_LIMIT_REDIS_URL= # Optional, uses in-memory if not set
```

### Testing Strategy
- Unit tests for each utility function (rate limiter, validation, sanitization)
- Integration tests for each API endpoint
- Security testing (rate limiting verification, CSRF protection, XSS prevention)
- Email delivery testing (both primary and fallback)
- Load testing for rate limiter
- Error scenario testing (invalid inputs, service failures)

### Security Considerations
- Never expose sensitive information in error messages
- Implement proper logging without leaking PII
- Use environment variables for all secrets
- Rate limiting should prevent DDoS attacks
- CSRF tokens must be validated on every request
- Input sanitization prevents XSS and SQL injection
- HTTPS required in production
- Content Security Policy headers configured

### Error Handling Strategy
- Consistent JSON error response format across all endpoints
- Appropriate HTTP status codes (400 for validation, 429 for rate limit, 500 for server errors)
- Error logging without exposing internals to client
- Graceful degradation when email service fails
- Retry logic for transient failures

### Performance Considerations
- Rate limiter should be fast (in-memory preferred, redis for distributed systems)
- Email sending should be async to avoid blocking response
- Consider queueing system for high-volume email sending
- Serverless function cold start optimization
- Keep bundle size minimal for API routes

### Future Enhancements
- Database integration for storing submissions
- Admin dashboard for viewing submissions
- Webhook notifications for demo requests
- Advanced spam detection (reCAPTCHA integration)
- Email template builder
- A/B testing for email templates
