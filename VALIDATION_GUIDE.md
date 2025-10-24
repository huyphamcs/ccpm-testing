# SEO & Social Media Validation Guide

This guide provides step-by-step instructions for validating the SEO implementation, structured data, and social media tags.

## 1. Google Rich Results Test

Validate the JSON-LD structured data for Organization and WebSite schemas:

### Steps:
1. Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your website URL or paste the HTML source
3. Click "Test URL" or "Test Code"
4. Verify that both Organization and WebSite schemas are detected
5. Check for any errors or warnings

### Expected Results:
- **Organization Schema**: Should show organization name, URL, logo, description, social links, and contact information
- **WebSite Schema**: Should show website name, URL, and description
- No errors should be present

## 2. Open Graph Validation

Test Open Graph tags for Facebook and LinkedIn sharing:

### Facebook Sharing Debugger:
1. Visit [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Enter your website URL
3. Click "Debug"
4. Verify the following:
   - Title: "Epic Landing Page - Create Stunning Landing Pages That Convert"
   - Description: "Create stunning landing pages that convert visitors into customers..."
   - Image: Should display the generated OG image (1200x630px)
   - Type: website
   - URL: https://epic-landing-page.com

### LinkedIn Post Inspector:
1. Visit [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. Enter your website URL
3. Click "Inspect"
4. Verify similar metadata as Facebook debugger

## 3. Twitter Card Validator

Test Twitter Card tags for Twitter/X sharing:

### Steps:
1. Visit [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Enter your website URL
3. Click "Preview card"
4. Verify the following:
   - Card Type: summary_large_image
   - Title: "Epic Landing Page - Create Stunning Landing Pages That Convert"
   - Description: "Create stunning landing pages that convert visitors into customers..."
   - Image: Should display the generated Twitter image (1200x630px)
   - Site: @epiclanding
   - Creator: @epiclanding

## 4. Meta Tags Checker

Use a meta tags checker to verify all SEO tags:

### Steps:
1. Visit [Meta Tags](https://metatags.io/) or similar tool
2. Enter your website URL
3. Review all detected meta tags:
   - Basic SEO tags (title, description, keywords)
   - Open Graph tags
   - Twitter Card tags
   - Robots meta tags
   - Canonical URL

## 5. Manual HTML Inspection

### Steps:
1. Start the development server: `npm run dev`
2. Open the site in a browser
3. View page source (Ctrl+U or Cmd+U)
4. Verify the following elements are present:

#### Meta Tags:
```html
<meta name="description" content="Create stunning landing pages..." />
<meta name="keywords" content="landing page builder, landing page templates..." />
```

#### Open Graph Tags:
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://epic-landing-page.com" />
<meta property="og:title" content="Epic Landing Page..." />
<meta property="og:description" content="Create stunning landing pages..." />
<meta property="og:image" content="/og-image.png" />
```

#### Twitter Card Tags:
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@epiclanding" />
<meta name="twitter:title" content="Epic Landing Page..." />
<meta name="twitter:description" content="Create stunning landing pages..." />
<meta name="twitter:image" content="/twitter-image.png" />
```

#### JSON-LD Structured Data:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Epic Landing Page",
  ...
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Epic Landing Page",
  ...
}
</script>
```

## 6. Structured Data Testing Tool

Additional validation using Google's Schema Markup Validator:

### Steps:
1. Visit [Schema Markup Validator](https://validator.schema.org/)
2. Paste your website URL or HTML source
3. Click "Run Test"
4. Verify no errors are reported
5. Check that Organization and WebSite types are recognized

## 7. Lighthouse SEO Audit

Run a Lighthouse audit to check overall SEO score:

### Steps:
1. Open your site in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select "SEO" category
5. Click "Analyze page load"
6. Review the SEO score and recommendations

### Expected Results:
- Meta description present: ✓
- Document has a title: ✓
- Links are crawlable: ✓
- Page has valid robots.txt: ✓
- Image elements have alt attributes: ✓

## 8. Mobile-Friendly Test

Verify mobile optimization:

### Steps:
1. Visit [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
2. Enter your website URL
3. Click "Test URL"
4. Verify the page is mobile-friendly

## Validation Checklist

- [ ] Google Rich Results Test shows no errors
- [ ] Organization schema detected and valid
- [ ] WebSite schema detected and valid
- [ ] Facebook Sharing Debugger shows correct metadata
- [ ] LinkedIn Post Inspector shows correct metadata
- [ ] Twitter Card Validator shows correct preview
- [ ] All meta tags present in HTML source
- [ ] JSON-LD structured data present and valid
- [ ] Schema Markup Validator shows no errors
- [ ] Lighthouse SEO score > 90
- [ ] Mobile-friendly test passes
- [ ] Open Graph images display correctly
- [ ] Twitter Card images display correctly

## Notes

- Replace placeholder social media handles (@epiclanding) with actual handles
- Replace verification codes with actual codes from Google Search Console
- Update the domain (epic-landing-page.com) to the actual production domain
- Ensure images (og-image.png, twitter-image.png) are accessible and correctly sized
- Test on multiple social platforms before launch
