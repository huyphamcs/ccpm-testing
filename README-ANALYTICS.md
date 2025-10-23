# Analytics & SEO Setup

## Google Analytics 4

### Setup

1. Create a GA4 property at https://analytics.google.com
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to your environment variables:

```bash
# .env.local
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Features Implemented

- **Pageview Tracking**: Automatic tracking on route changes
- **Scroll Depth**: Tracks at 25%, 50%, 75%, and 100%
- **CTA Clicks**: Custom events for all call-to-action buttons
- **Form Submissions**: Tracks newsletter and other form submissions
- **Privacy**: Only loads in production, respects DNT headers

### Custom Events

Use the analytics utilities to track custom events:

```typescript
import { trackCTAClick, trackFormSubmission, trackScrollDepth } from "@/lib/analytics";

// Track CTA clicks
trackCTAClick("start_trial", "hero");

// Track form submissions
trackFormSubmission("newsletter", true);

// Track scroll depth (handled automatically)
trackScrollDepth(50);
```

## SEO Implementation

### Metadata

Comprehensive SEO metadata configured in `src/app/layout.tsx`:

- **Title**: Dynamic with template support
- **Description**: Optimized for search results
- **Keywords**: Relevant industry terms
- **Canonical URLs**: Prevent duplicate content
- **Open Graph**: Social sharing for Facebook, LinkedIn
- **Twitter Cards**: Large image cards for Twitter
- **Robots**: Proper indexing instructions

### Structured Data (JSON-LD)

Implemented Schema.org vocabulary:

- **Organization**: Company information, contact details
- **WebSite**: Site-wide search action
- Located in `src/components/seo/StructuredData.tsx`

Validate at: https://search.google.com/test/rich-results

### Sitemap

Dynamic sitemap generated at `/sitemap.xml`:

- Homepage
- About, Pricing, Docs, Blog pages
- Automatic lastModified dates
- Change frequency and priority hints

Located at `src/app/sitemap.ts`

### Robots.txt

Configured at `/public/robots.txt`:

- Allows all user agents
- Disallows /api/ and /admin/ routes
- Sitemap location specified

## Social Media

### Open Graph (Facebook, LinkedIn)

- Type: website
- Title, description, images
- 1200x630px recommended image size
- Located in layout metadata

### Twitter Cards

- Card type: summary_large_image
- Site and creator handles
- Title, description, images
- 1200x630px recommended image size

### Required Images

Create these images in `/public/`:

- `og-image.png` (1200x630px) - Open Graph
- `twitter-image.png` (1200x630px) - Twitter Card
- `favicon.ico` - Browser icon

## Verification

### Google Search Console

1. Add site to Search Console
2. Get verification code
3. Update `layout.tsx` metadata:

```typescript
verification: {
  google: "your-verification-code-here",
}
```

### Testing Tools

- **Rich Results**: https://search.google.com/test/rich-results
- **Open Graph**: https://www.opengraph.xyz/
- **Twitter Card**: https://cards-dev.twitter.com/validator
- **PageSpeed Insights**: https://pagespeed.web.dev/

## Performance

- Analytics script loads with `afterInteractive` strategy
- Scroll tracking uses passive event listeners
- No analytics in development mode
- Minimal impact on Core Web Vitals

## Privacy & GDPR

**Note**: This implementation does not include cookie consent UI. For GDPR compliance, you should:

1. Add a cookie consent banner
2. Only load GA after user consent
3. Implement opt-out functionality
4. Update privacy policy

Consider using libraries like:
- `react-cookie-consent`
- `@cookiehub/consent`
- Custom implementation

## Environment Variables

Required environment variables:

```bash
# .env.local
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX  # Google Analytics Measurement ID

# Optional
NEXT_PUBLIC_SITE_URL=https://yourbrand.com  # Production URL
```

## Next Steps

1. Create GA4 property and get Measurement ID
2. Add Measurement ID to environment variables
3. Create social media images (og-image.png, twitter-image.png)
4. Verify with Google Search Console
5. Test with validation tools
6. Add cookie consent (for GDPR compliance)
7. Monitor analytics in GA4 dashboard
