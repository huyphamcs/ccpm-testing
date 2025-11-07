# Security Checklist

This document provides a comprehensive security audit checklist for the landing page application. Review each section regularly to ensure the application maintains security best practices.

## Table of Contents

1. [HTTPS Enforcement](#https-enforcement)
2. [Rate Limiting](#rate-limiting)
3. [CSRF Protection](#csrf-protection)
4. [Input Sanitization](#input-sanitization)
5. [XSS Vulnerability Checks](#xss-vulnerability-checks)
6. [Authentication & Authorization](#authentication--authorization)
7. [Sensitive Data Exposure](#sensitive-data-exposure)
8. [Dependencies Security](#dependencies-security)
9. [Environment Variables](#environment-variables)
10. [OWASP Top 10](#owasp-top-10)

---

## HTTPS Enforcement

**Objective:** Ensure all traffic is encrypted and transmitted over HTTPS.

- [ ] **Verify HTTPS is enabled** in production environment
- [ ] **Check Strict-Transport-Security (HSTS) header** is configured in `next.config.ts`
  - [ ] `max-age` is set to at least 1 year (31536000 seconds)
  - [ ] `includeSubDomains` directive is present
  - [ ] `preload` directive is included for HSTS preload list
- [ ] **Verify HTTP to HTTPS redirects** are configured at the server/CDN level
- [ ] **Check for mixed content warnings** in browser console
- [ ] **Validate SSL/TLS certificate** is valid and not expired
- [ ] **Ensure TLS 1.2+ is enforced**, older protocols disabled

**Tools:**
```bash
# Check SSL/TLS configuration
curl -I https://yourdomain.com

# Test SSL/TLS with SSL Labs
# https://www.ssllabs.com/ssltest/
```

---

## Rate Limiting

**Objective:** Prevent abuse and DDoS attacks by limiting request frequency.

- [ ] **API routes have rate limiting** configured
- [ ] **Rate limits are appropriate** for each endpoint:
  - [ ] Form submissions: 5-10 requests per minute per IP
  - [ ] API endpoints: 100 requests per minute per IP
  - [ ] Authentication attempts: 5 attempts per 15 minutes
- [ ] **Rate limiting is tested** under load
- [ ] **Error responses** provide clear feedback without exposing system details
- [ ] **Consider implementing** progressive delays for repeated violations

**Implementation Example:**
```typescript
// Consider using middleware like next-rate-limit or upstash/ratelimit
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
```

---

## CSRF Protection

**Objective:** Prevent Cross-Site Request Forgery attacks.

- [ ] **CSRF tokens are implemented** for state-changing operations
- [ ] **SameSite cookie attribute** is set appropriately:
  - [ ] `SameSite=Lax` or `SameSite=Strict` for session cookies
- [ ] **Verify Origin/Referer headers** for sensitive operations
- [ ] **Double-submit cookie pattern** is implemented if using token-based auth
- [ ] **GET requests never modify state** (idempotent operations only)
- [ ] **Form actions use POST/PUT/DELETE** methods appropriately

**Next.js API Route Protection:**
```typescript
// Verify origin header matches expected domain
if (req.headers.origin !== process.env.NEXT_PUBLIC_APP_URL) {
  return res.status(403).json({ error: 'Forbidden' });
}
```

---

## Input Sanitization

**Objective:** Validate and sanitize all user inputs to prevent injection attacks.

- [ ] **All user inputs are validated** on the server side
- [ ] **Client-side validation exists** but is not relied upon for security
- [ ] **Input validation libraries** are used (e.g., zod, joi, validator.js)
- [ ] **Email inputs are validated** with proper regex/library
- [ ] **File uploads are restricted** by type, size, and scanned
- [ ] **Special characters are escaped** in database queries
- [ ] **SQL queries use parameterized statements** or ORM
- [ ] **NoSQL queries prevent injection** (sanitize MongoDB operators)
- [ ] **Command injection is prevented** (avoid exec/eval with user input)

**Validation Example:**
```typescript
import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});
```

---

## XSS Vulnerability Checks

**Objective:** Prevent Cross-Site Scripting attacks.

- [ ] **Content Security Policy (CSP) is configured** in `next.config.ts`
- [ ] **All user-generated content is escaped** before rendering
- [ ] **React's default escaping is relied upon** (avoid dangerouslySetInnerHTML)
- [ ] **If using dangerouslySetInnerHTML**, content is sanitized with DOMPurify
- [ ] **X-XSS-Protection header is set** for legacy browser support
- [ ] **User input is never used in script contexts** without sanitization
- [ ] **URL parameters are validated** before use in DOM
- [ ] **Event handlers don't use user input** directly

**Sanitization Example:**
```typescript
import DOMPurify from 'isomorphic-dompurify';

const cleanHTML = DOMPurify.sanitize(userInput);
```

---

## Authentication & Authorization

**Objective:** Ensure secure user authentication and proper access controls.

- [ ] **Authentication mechanism is implemented** (if applicable)
  - [ ] Passwords are hashed with bcrypt/argon2 (min 10 rounds)
  - [ ] Session tokens are cryptographically secure and random
  - [ ] JWT tokens have expiration times set
  - [ ] Refresh token rotation is implemented
- [ ] **Password requirements are enforced**:
  - [ ] Minimum 8 characters
  - [ ] Complexity requirements (uppercase, lowercase, numbers, symbols)
- [ ] **Multi-factor authentication (MFA)** is available
- [ ] **Account lockout** after failed login attempts
- [ ] **Password reset tokens** expire after 1 hour
- [ ] **Authorization checks** are performed server-side for all protected resources
- [ ] **Principle of least privilege** is followed for user roles
- [ ] **Session timeout** is configured appropriately (15-30 minutes)

**Session Security:**
```typescript
// Secure cookie settings
{
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 1800000, // 30 minutes
}
```

---

## Sensitive Data Exposure

**Objective:** Protect sensitive information from unauthorized access.

- [ ] **No sensitive data in client-side code** (API keys, secrets)
- [ ] **Environment variables are properly secured**
  - [ ] `.env` files are in `.gitignore`
  - [ ] Production secrets use secure secret management
- [ ] **API responses don't include sensitive fields** (passwords, tokens)
- [ ] **Error messages don't expose system details** (stack traces, paths)
- [ ] **Logging doesn't include sensitive information**:
  - [ ] No passwords, tokens, or PII in logs
  - [ ] Credit card numbers are masked
- [ ] **HTTPS is used for all data transmission**
- [ ] **Data at rest is encrypted** (if storing sensitive data)
- [ ] **Browser autocomplete is disabled** for sensitive fields
- [ ] **Clear sensitive data from memory** after use

**Example - Sanitized Error Response:**
```typescript
// Don't expose internal errors
catch (error) {
  console.error('Internal error:', error); // Log internally
  return res.status(500).json({
    error: 'An error occurred processing your request'
  });
}
```

---

## Dependencies Security

**Objective:** Keep dependencies up-to-date and free from known vulnerabilities.

- [ ] **Run `npm audit` regularly** and address findings
- [ ] **Use `npm audit fix`** to automatically patch vulnerabilities
- [ ] **Review `npm audit` output** for breaking changes before applying
- [ ] **Dependencies are kept up-to-date**:
  - [ ] Automated tools like Dependabot/Renovate are configured
  - [ ] Security updates are prioritized
- [ ] **Lock files are committed** (package-lock.json)
- [ ] **Avoid dependencies with known vulnerabilities**
- [ ] **Review dependency licenses** for compliance
- [ ] **Minimize number of dependencies** (reduce attack surface)
- [ ] **Use security scanning tools**:
  - [ ] Snyk
  - [ ] npm audit
  - [ ] GitHub Dependabot

**Commands:**
```bash
# Audit dependencies
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Fix with breaking changes (review carefully)
npm audit fix --force

# Check for outdated packages
npm outdated

# Update dependencies
npm update
```

---

## Environment Variables

**Objective:** Secure configuration and prevent exposure of secrets.

- [ ] **All secrets are in environment variables**, not hardcoded
- [ ] **`.env` files are in `.gitignore`**
- [ ] **`.env.example` provides template** without actual values
- [ ] **Production secrets use secure secret management**:
  - [ ] Vercel Environment Variables
  - [ ] AWS Secrets Manager
  - [ ] HashiCorp Vault
  - [ ] Azure Key Vault
- [ ] **Environment variables are validated** at startup
- [ ] **Public variables use `NEXT_PUBLIC_` prefix** only when necessary
- [ ] **No sensitive data in `NEXT_PUBLIC_` variables**
- [ ] **Different secrets for each environment** (dev, staging, prod)
- [ ] **Access to production secrets is restricted** to authorized personnel
- [ ] **Secrets are rotated regularly** (API keys, tokens, passwords)

**Environment Variable Validation:**
```typescript
const requiredEnvVars = [
  'DATABASE_URL',
  'API_SECRET',
  'NEXT_PUBLIC_APP_URL',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

---

## OWASP Top 10

**Objective:** Address the most critical web application security risks.

### A01:2021 - Broken Access Control

- [ ] **Access control checks** are enforced server-side
- [ ] **Default deny** policy for unauthorized access
- [ ] **No direct object references** without authorization checks
- [ ] **CORS is properly configured** (not wildcard `*` in production)

### A02:2021 - Cryptographic Failures

- [ ] **HTTPS is enforced** everywhere
- [ ] **Sensitive data is encrypted** at rest and in transit
- [ ] **Strong encryption algorithms** are used (AES-256, RSA-2048+)
- [ ] **Cryptographic keys are managed securely**

### A03:2021 - Injection

- [ ] **Input validation and sanitization** implemented
- [ ] **Parameterized queries/ORMs** used for database access
- [ ] **No eval() or dangerous functions** with user input
- [ ] **Command injection prevention** measures in place

### A04:2021 - Insecure Design

- [ ] **Threat modeling** performed during design phase
- [ ] **Security requirements** defined early in development
- [ ] **Secure design patterns** followed throughout application
- [ ] **Rate limiting and throttling** implemented

### A05:2021 - Security Misconfiguration

- [ ] **Security headers configured** in `next.config.ts`
- [ ] **Default accounts/passwords changed** or removed
- [ ] **Unnecessary features disabled** (unused API routes)
- [ ] **Error messages don't expose** sensitive information
- [ ] **Security patches applied** promptly

### A06:2021 - Vulnerable and Outdated Components

- [ ] **Dependencies regularly updated** (see Dependencies Security section)
- [ ] **Deprecated packages replaced** with maintained alternatives
- [ ] **Vulnerability scanning** automated in CI/CD pipeline

### A07:2021 - Identification and Authentication Failures

- [ ] **Strong password policy** enforced
- [ ] **MFA available** for user accounts
- [ ] **Session management secure** (see Authentication section)
- [ ] **Credential stuffing protection** (rate limiting, CAPTCHA)

### A08:2021 - Software and Data Integrity Failures

- [ ] **Subresource Integrity (SRI)** used for external resources
- [ ] **Code signing** implemented for releases
- [ ] **CI/CD pipeline security** reviewed and hardened
- [ ] **Dependency integrity checks** (lock files, checksums)

### A09:2021 - Security Logging and Monitoring Failures

- [ ] **Security events are logged**:
  - [ ] Failed login attempts
  - [ ] Access control failures
  - [ ] Input validation failures
- [ ] **Logs are monitored** for suspicious activity
- [ ] **Alerting configured** for security incidents
- [ ] **Log data is protected** from tampering
- [ ] **Logs don't contain sensitive data**

### A10:2021 - Server-Side Request Forgery (SSRF)

- [ ] **URLs are validated** before making outbound requests
- [ ] **Whitelist allowed domains** for external requests
- [ ] **Internal IP ranges blocked** from user-supplied URLs
- [ ] **Network segmentation** implemented where possible

---

## Additional Security Measures

### Content Security Policy (CSP)

- [ ] **CSP is configured** in `next.config.ts`
- [ ] **CSP violations are monitored** via report-uri directive
- [ ] **CSP is tested** in staging environment before production
- [ ] **Production CSP is stricter** (remove unsafe-inline/unsafe-eval if possible)

### Security Monitoring

- [ ] **Application monitoring** configured (Sentry, LogRocket, DataDog)
- [ ] **Uptime monitoring** enabled
- [ ] **Security alerts** configured for critical events
- [ ] **Regular penetration testing** scheduled
- [ ] **Security audit trail** maintained

### Incident Response

- [ ] **Incident response plan** documented
- [ ] **Security contact information** available
- [ ] **Backup and recovery procedures** tested
- [ ] **Security team contacts** defined

---

## Automation

Consider automating security checks in your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Security Audit
  run: |
    npm audit --audit-level=high
    npm run lint
    npm run type-check

- name: Dependency Check
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [CWE Top 25 Most Dangerous Software Weaknesses](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

## Review Schedule

- [ ] **Daily:** Monitor security logs and alerts
- [ ] **Weekly:** Run `npm audit` and review dependency updates
- [ ] **Monthly:** Review access controls and user permissions
- [ ] **Quarterly:** Complete full security checklist review
- [ ] **Annually:** Conduct comprehensive security audit and penetration test

---

**Last Updated:** 2025-10-24
**Next Review Date:** _[Set quarterly review date]_
**Reviewed By:** _[Name/Team]_
