# Deployment Guide

This guide provides step-by-step instructions for deploying your Next.js landing page to Vercel with proper configuration, security, and monitoring.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Environment Variables Configuration](#environment-variables-configuration)
- [Deployment Steps](#deployment-steps)
- [Custom Domain Setup](#custom-domain-setup)
- [SSL Configuration](#ssl-configuration)
- [Preview Deployments Workflow](#preview-deployments-workflow)
- [Post-Deployment Verification](#post-deployment-verification)
- [Rollback Procedures](#rollback-procedures)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Your code must be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **Custom Domain** (optional): A domain name for your production site
4. **Email Service Credentials**: At least one of:
   - Resend API key (recommended)
   - SendGrid API key (backup)
   - Formspree endpoint (fallback)
5. **Node.js**: v18 or higher installed locally for testing
6. **npm/yarn**: Package manager installed

## Initial Setup

### 1. Install Vercel CLI (Optional but Recommended)

```bash
npm i -g vercel
```

### 2. Link Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Select the repository containing your landing page

### 3. Configure Build Settings

Vercel should auto-detect Next.js, but verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` or `next build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`
- **Root Directory**: `./` (unless your Next.js app is in a subdirectory)

## Environment Variables Configuration

### Setting Environment Variables in Vercel

1. Navigate to your project in Vercel Dashboard
2. Go to **Settings** → **Environment Variables**
3. Add each variable from `.env.production.example`
4. Select appropriate environments:
   - **Production**: For your main domain
   - **Preview**: For preview deployments (PRs)
   - **Development**: For local development (optional)

### Required Environment Variables

Add these variables with your actual values:

#### Email Configuration

```env
# Primary Email Provider (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Backup Email Provider (SendGrid) - Optional but recommended
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Fallback Email Provider (Formspree) - Optional
FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx

# Email Addresses
EMAIL_FROM=noreply@yourdomain.com
SALES_EMAIL=sales@yourdomain.com
```

#### CORS Configuration

```env
# Add your production domain(s)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

#### Application Configuration

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

#### Analytics (Optional)

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry (Error Tracking)
SENTRY_DSN=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@o000000.ingest.sentry.io/0000000
SENTRY_ENVIRONMENT=production
```

### How to Obtain API Keys

#### Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (Settings → Domains)
3. Create an API key (API Keys → Create API Key)
4. Copy the key (starts with `re_`)

#### SendGrid API Key

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Verify your sender identity (Settings → Sender Authentication)
3. Create an API key (Settings → API Keys → Create API Key)
4. Choose "Full Access" or "Restricted Access" with Mail Send permissions
5. Copy the key (starts with `SG.`)

#### Formspree Endpoint

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the form endpoint URL (e.g., `https://formspree.io/f/xxxxxxxx`)

#### Google Analytics 4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a GA4 property
3. Get your Measurement ID from Admin → Data Streams
4. Copy the ID (format: `G-XXXXXXXXXX`)

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended for First Deployment)

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Select your Git repository
   - Click "Import"

2. **Configure Project**
   - Verify build settings (should be auto-detected)
   - Add environment variables (see above)
   - Click "Deploy"

3. **Wait for Build**
   - Vercel will clone your repository
   - Install dependencies
   - Build your Next.js application
   - Deploy to production

4. **Verify Deployment**
   - Check the deployment URL (e.g., `your-project.vercel.app`)
   - Test all forms and functionality
   - Verify email delivery

### Method 2: Deploy via Vercel CLI

```bash
# Login to Vercel
vercel login

# Link your project (first time only)
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: Automatic Deployments via Git

Once linked, Vercel automatically deploys:

- **Production**: When you push to your main/master branch
- **Preview**: When you create or update a pull request

## Custom Domain Setup

### Adding Your Domain

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Click "Add Domain"
4. Enter your domain (e.g., `yourdomain.com`)
5. Click "Add"

### DNS Configuration

#### Option 1: Use Vercel's Nameservers (Recommended)

1. Vercel will provide nameservers (e.g., `ns1.vercel-dns.com`)
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Update nameservers to Vercel's nameservers
4. Wait for DNS propagation (can take up to 48 hours)

#### Option 2: Use CNAME Record

1. In your DNS provider, add a CNAME record:
   - **Type**: CNAME
   - **Name**: `www` (or `@` for apex domain)
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: 3600 (or default)

2. For apex domain (`yourdomain.com`), add an A record:
   - **Type**: A
   - **Name**: `@`
   - **Value**: `76.76.21.21`
   - **TTL**: 3600

### WWW Redirect Configuration

To redirect `www.yourdomain.com` → `yourdomain.com` (or vice versa):

1. Add both domains in Vercel Dashboard
2. Vercel automatically handles the redirect
3. Or configure in `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.yourdomain.com"
        }
      ],
      "destination": "https://yourdomain.com/:path*",
      "permanent": true
    }
  ]
}
```

## SSL Configuration

### Automatic SSL

Vercel automatically provisions SSL certificates using Let's Encrypt:

1. SSL certificates are issued automatically when you add a domain
2. Certificates auto-renew before expiration
3. HTTP requests are automatically redirected to HTTPS

### Verify SSL Certificate

```bash
# Check certificate
curl -vI https://yourdomain.com 2>&1 | grep -i "SSL\|TLS"

# Or use online tools
# https://www.ssllabs.com/ssltest/
```

### Force HTTPS

Already configured in `next.config.ts`:

```typescript
{
  headers: [
    {
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains; preload"
    }
  ]
}
```

## Preview Deployments Workflow

### How Preview Deployments Work

1. **Create a Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

3. **Create Pull Request**
   - Go to your repository on GitHub/GitLab
   - Create a pull request to main branch
   - Vercel automatically creates a preview deployment

4. **Review Preview**
   - Click the Vercel bot comment in your PR
   - Test the preview URL
   - Each commit updates the preview

5. **Merge to Production**
   - Once approved, merge the PR
   - Vercel automatically deploys to production

### Preview URL Format

- Preview: `your-project-git-branch-name-team.vercel.app`
- Production: `yourdomain.com` or `your-project.vercel.app`

### Environment Variables for Previews

Preview deployments can use different environment variables:

1. Go to **Settings** → **Environment Variables**
2. When adding a variable, select "Preview" environment
3. Use test API keys for previews (recommended)

## Post-Deployment Verification

### Verification Checklist

Use this checklist after every deployment:

#### Functionality Tests

- [ ] **Homepage loads correctly**
  ```bash
  curl -I https://yourdomain.com
  # Should return 200 OK
  ```

- [ ] **All forms are working**
  - [ ] Newsletter signup form
  - [ ] Demo request form
  - [ ] Contact form

- [ ] **Email delivery is working**
  - [ ] Submit a test form
  - [ ] Verify user receives confirmation email
  - [ ] Verify sales team receives notification

- [ ] **Analytics tracking is working**
  - [ ] Check Google Analytics Real-Time reports
  - [ ] Verify page views are being tracked

#### Security Tests

- [ ] **HTTPS is working**
  ```bash
  curl -I https://yourdomain.com | grep "HTTP/2"
  ```

- [ ] **Security headers are present**
  ```bash
  curl -I https://yourdomain.com | grep -E "Content-Security-Policy|X-Frame-Options|Strict-Transport-Security"
  ```

- [ ] **CORS is configured correctly**
  ```bash
  curl -I -X OPTIONS https://yourdomain.com/api/submit-form \
    -H "Origin: https://yourdomain.com" \
    -H "Access-Control-Request-Method: POST"
  ```

- [ ] **Rate limiting is working**
  - Submit a form multiple times rapidly
  - Should be blocked after configured limit

#### Performance Tests

- [ ] **Lighthouse score check**
  - Open Chrome DevTools
  - Run Lighthouse audit
  - Target: Performance > 90, Accessibility > 95

- [ ] **Core Web Vitals**
  - Check in Google Search Console
  - Monitor in Vercel Analytics
  - LCP < 2.5s, FID < 100ms, CLS < 0.1

- [ ] **Build size is optimized**
  - Check Vercel build logs
  - Verify bundle size hasn't increased significantly

#### Browser Testing

- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)
- [ ] **Mobile browsers** (iOS Safari, Chrome Mobile)

#### Mobile Responsiveness

- [ ] **Mobile layout** (375px width)
- [ ] **Tablet layout** (768px width)
- [ ] **Desktop layout** (1440px width)

### Automated Testing Script

Create a script to automate verification:

```bash
#!/bin/bash
# deploy-verify.sh

URL="https://yourdomain.com"

echo "🔍 Verifying deployment at $URL"

# Check HTTP status
STATUS=$(curl -o /dev/null -s -w "%{http_code}" $URL)
if [ $STATUS -eq 200 ]; then
  echo "✅ Site is accessible (HTTP $STATUS)"
else
  echo "❌ Site returned HTTP $STATUS"
  exit 1
fi

# Check security headers
HEADERS=$(curl -I -s $URL)
if echo "$HEADERS" | grep -q "Strict-Transport-Security"; then
  echo "✅ HSTS header present"
else
  echo "⚠️  HSTS header missing"
fi

if echo "$HEADERS" | grep -q "Content-Security-Policy"; then
  echo "✅ CSP header present"
else
  echo "⚠️  CSP header missing"
fi

echo "✅ Deployment verification complete"
```

## Rollback Procedures

### Instant Rollback via Vercel Dashboard

1. Go to your project in Vercel Dashboard
2. Navigate to **Deployments**
3. Find a previous working deployment
4. Click the three dots (•••) → "Promote to Production"
5. Confirm the rollback

This instantly reverts your site to the selected deployment.

### Rollback via Vercel CLI

```bash
# List recent deployments
vercel ls

# Promote a specific deployment to production
vercel promote <deployment-url>
```

### Rollback via Git

```bash
# Find the commit to rollback to
git log --oneline

# Create a new branch from that commit
git checkout -b rollback/<commit-hash> <commit-hash>

# Push to main (or create PR)
git push origin rollback/<commit-hash>

# Vercel will automatically deploy the old code
```

### Emergency Rollback Checklist

When something goes wrong in production:

1. **Assess the Issue**
   - Is it critical? (site down, data loss, security breach)
   - Can it be hotfixed quickly?

2. **Communicate**
   - Alert your team
   - Post status update (if using status page)

3. **Rollback**
   - Use Vercel Dashboard for fastest rollback
   - Takes effect within seconds

4. **Verify Rollback**
   - Test site functionality
   - Check error monitoring (Sentry)
   - Verify with users/stakeholders

5. **Root Cause Analysis**
   - Investigate what went wrong
   - Fix in a new branch
   - Test thoroughly before redeploying

### Rollback Best Practices

- **Keep deployments small**: Easier to identify issues
- **Deploy during low-traffic hours**: Minimize impact
- **Monitor after deployment**: Catch issues early
- **Have rollback plan ready**: Know the steps beforehand
- **Test rollbacks in preview**: Practice the process

## Monitoring & Maintenance

### Built-in Vercel Analytics

1. Go to your project in Vercel Dashboard
2. Navigate to **Analytics**
3. Monitor:
   - Page views
   - Top pages
   - User retention
   - Web Vitals (LCP, FID, CLS)

### Real-Time Monitoring

#### Enable Sentry (Recommended)

1. Install Sentry:
   ```bash
   npm install @sentry/nextjs
   ```

2. Initialize Sentry:
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

3. Add SENTRY_DSN to Vercel environment variables

4. Monitor errors at [sentry.io](https://sentry.io)

#### Vercel Runtime Logs

1. Go to **Deployments** → Select deployment
2. Click **View Function Logs**
3. Real-time logs from your API routes and functions

### Uptime Monitoring

Set up external monitoring:

- **UptimeRobot**: Free tier available
- **Pingdom**: Comprehensive monitoring
- **Better Uptime**: User-friendly interface
- **StatusCake**: Free plan available

Configure alerts for:
- Site downtime (HTTP 500, 502, 503)
- Slow response times (> 3 seconds)
- SSL certificate expiration

### Performance Monitoring

#### Lighthouse CI

Add to your CI/CD pipeline:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://yourdomain.com
          uploadArtifacts: true
```

#### Web Vitals

Monitor in Google Search Console:
1. Verify domain ownership
2. Go to **Experience** → **Core Web Vitals**
3. Address any issues flagged

### Regular Maintenance Tasks

#### Weekly

- [ ] Check Vercel Analytics for traffic patterns
- [ ] Review error logs in Sentry
- [ ] Test all forms are working
- [ ] Check email deliverability

#### Monthly

- [ ] Review and update dependencies
  ```bash
  npm outdated
  npm update
  ```
- [ ] Check for security vulnerabilities
  ```bash
  npm audit
  ```
- [ ] Review and rotate API keys (if needed)
- [ ] Backup environment variables
- [ ] Check SSL certificate status

#### Quarterly

- [ ] Performance audit with Lighthouse
- [ ] Review and optimize bundle size
- [ ] Update documentation
- [ ] Review and update third-party integrations
- [ ] Test disaster recovery procedures

## Troubleshooting

### Common Issues and Solutions

#### Build Failures

**Issue**: Build fails with dependency errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm ci for clean install
npm ci
```

**Issue**: Build fails with TypeScript errors

**Solution**:
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Fix type errors before deploying
```

**Issue**: Build exceeds time limit (45 minutes on Hobby plan)

**Solution**:
- Optimize build process
- Remove unnecessary dependencies
- Consider upgrading to Pro plan

---

#### Deployment Issues

**Issue**: Environment variables not working

**Solution**:
1. Verify variables are set in Vercel Dashboard
2. Check spelling and case sensitivity
3. Redeploy after adding variables
4. Use `NEXT_PUBLIC_` prefix for client-side variables

**Issue**: CSS not loading correctly

**Solution**:
```bash
# Clear .next build cache
rm -rf .next
npm run build
```

**Issue**: API routes returning 404

**Solution**:
- Verify file structure: `app/api/route-name/route.ts`
- Check `next.config.ts` for any rewrites
- Ensure proper export: `export async function POST(request: Request)`

---

#### Domain & SSL Issues

**Issue**: Domain not connecting

**Solution**:
1. Check DNS propagation: `dig yourdomain.com`
2. Wait up to 48 hours for DNS propagation
3. Verify DNS records in registrar
4. Check Vercel domain status in Dashboard

**Issue**: SSL certificate not provisioning

**Solution**:
1. Remove and re-add domain in Vercel
2. Ensure DNS is correctly configured
3. Check domain registrar settings
4. Wait 24 hours for certificate issuance

**Issue**: Mixed content warnings

**Solution**:
- Ensure all resources use HTTPS
- Update hardcoded HTTP URLs to HTTPS
- Check third-party scripts and images

---

#### Email Delivery Issues

**Issue**: Emails not being sent

**Solution**:
1. Verify API keys are correct in Vercel
2. Check email provider dashboard for errors
3. Test with curl:
   ```bash
   curl -X POST https://yourdomain.com/api/submit-form \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test User"}'
   ```
4. Check Vercel Function Logs for errors

**Issue**: Emails going to spam

**Solution**:
- Configure SPF, DKIM, and DMARC records
- Use verified sender domain
- Avoid spam trigger words
- Include unsubscribe link
- Maintain good sender reputation

**Issue**: Email provider rate limits

**Solution**:
- Implement request throttling
- Use multiple providers with fallback
- Upgrade to higher tier plan
- Monitor usage in provider dashboard

---

#### Performance Issues

**Issue**: Slow page load times

**Solution**:
1. Run Lighthouse audit to identify bottlenecks
2. Optimize images:
   ```tsx
   import Image from 'next/image'
   // Use Next.js Image component
   ```
3. Enable caching in `vercel.json`
4. Minimize JavaScript bundle size
5. Use font optimization

**Issue**: High Time to First Byte (TTFB)

**Solution**:
- Optimize API routes
- Use edge functions for better latency
- Enable caching strategies
- Check database query performance

**Issue**: Large bundle size

**Solution**:
```bash
# Analyze bundle
npm run build
# Check output for largest modules

# Use dynamic imports
const Component = dynamic(() => import('./Component'))
```

---

#### Security Issues

**Issue**: CORS errors in browser console

**Solution**:
1. Verify `ALLOWED_ORIGINS` includes your domain
2. Check middleware configuration
3. Test CORS headers:
   ```bash
   curl -I -X OPTIONS https://yourdomain.com/api/route \
     -H "Origin: https://yourdomain.com"
   ```

**Issue**: CSRF token validation failing

**Solution**:
1. Ensure cookies are enabled
2. Check SameSite cookie settings
3. Verify middleware is running
4. Clear browser cookies and retry

**Issue**: Rate limiting too aggressive

**Solution**:
1. Adjust `RATE_LIMIT_MAX` in environment variables
2. Implement IP whitelist for trusted sources
3. Add retry logic with exponential backoff

---

#### Analytics & Monitoring Issues

**Issue**: Google Analytics not tracking

**Solution**:
1. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
2. Check GA4 configuration in Google Analytics
3. Disable ad blockers for testing
4. Verify gtag script is loaded in browser DevTools

**Issue**: Sentry not capturing errors

**Solution**:
1. Verify `SENTRY_DSN` is correct
2. Check Sentry project settings
3. Test error capture:
   ```typescript
   import * as Sentry from '@sentry/nextjs';
   Sentry.captureException(new Error('Test error'));
   ```
4. Check rate limits in Sentry dashboard

---

### Debug Mode

Enable verbose logging for troubleshooting:

```bash
# Add to environment variables
NEXT_PUBLIC_DEBUG=true
NODE_OPTIONS='--inspect'
```

### Getting Help

1. **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
2. **Vercel Support**: Available in Dashboard (Pro/Enterprise plans)
3. **Community**: [github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)
4. **Stack Overflow**: Tag questions with `vercel` and `next.js`

### Support Escalation

For critical issues:

1. Check [Vercel Status](https://www.vercel-status.com/)
2. Contact Vercel Support (Dashboard → Help)
3. Post in Next.js GitHub Discussions
4. Check community Discord/Slack

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Next.js Deployment Best Practices](https://nextjs.org/docs/deployment)
- [Web.dev Performance Guide](https://web.dev/performance/)

---

## Conclusion

This deployment guide should help you successfully deploy and maintain your Next.js landing page on Vercel. Remember to:

- Test thoroughly before deploying to production
- Monitor your site after deployment
- Keep dependencies updated
- Follow security best practices
- Document any customizations

For questions or issues not covered here, refer to the troubleshooting section or reach out to your development team.

**Happy deploying! 🚀**
