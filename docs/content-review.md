# Content Review Checklist

**Document Version:** 1.0
**Last Updated:** 2025-10-24
**Project:** Landing Page
**Review Type:** Content Finalization Audit

---

## Document Control

| Field | Value |
|-------|-------|
| Document Owner | Content Team Lead |
| Review Date | YYYY-MM-DD |
| Target Launch Date | YYYY-MM-DD |
| Review Status | [ ] Draft / [ ] In Review / [ ] Approved |

---

## 1. Spelling and Grammar Checklist

### 1.1 Automated Checks
- [ ] Run spell checker on all pages
- [ ] Use grammar checking tool (Grammarly, Hemingway, etc.)
- [ ] Verify proper capitalization throughout
- [ ] Check for consistent punctuation style

### 1.2 Manual Review
- [ ] Hero section copy reviewed
- [ ] Features section reviewed
- [ ] Benefits section reviewed
- [ ] Pricing section reviewed
- [ ] Testimonials section reviewed
- [ ] FAQ section reviewed
- [ ] Footer copy reviewed
- [ ] Form labels and placeholder text reviewed
- [ ] Error messages reviewed
- [ ] Success messages reviewed
- [ ] Modal and popup content reviewed

### 1.3 Common Issues Check
- [ ] No double spaces
- [ ] No trailing spaces
- [ ] Consistent use of oxford comma
- [ ] Proper use of em dashes vs hyphens
- [ ] Correct apostrophe usage (curly vs straight quotes)

**Issues Found:**
```
[Document any issues found during spelling and grammar review]
```

---

## 2. Link Verification Checklist

### 2.1 Internal Links
- [ ] Navigation menu links functional
- [ ] Footer links functional
- [ ] In-content anchor links functional
- [ ] CTA button links verified
- [ ] Logo link to homepage works
- [ ] Mobile menu links functional
- [ ] All hash/fragment links work correctly

### 2.2 External Links
- [ ] Social media links verified
- [ ] Partner/integration links checked
- [ ] Resource links validated
- [ ] Blog/documentation links active
- [ ] Support/help center links working
- [ ] Third-party service links functional

### 2.3 Link Properties
- [ ] External links open in new tab (target="_blank")
- [ ] External links have rel="noopener noreferrer"
- [ ] No broken links (404 errors)
- [ ] No redirect chains
- [ ] HTTPS used for all links
- [ ] No mixed content warnings

**Broken Links Log:**
| Link Text | URL | Location | Status | Action Required |
|-----------|-----|----------|--------|-----------------|
| | | | | |

---

## 3. Image Audit

### 3.1 Alt Text Review
- [ ] All images have alt attributes
- [ ] Alt text is descriptive and meaningful
- [ ] Decorative images use empty alt text (alt="")
- [ ] Alt text doesn't start with "image of" or "picture of"
- [ ] Complex images have detailed descriptions
- [ ] Logo alt text is appropriate

### 3.2 Image Loading
- [ ] Lazy loading implemented for below-fold images
- [ ] Critical images load eagerly
- [ ] Placeholder/blur effect implemented
- [ ] No layout shift during image load
- [ ] Fallback images configured for errors

### 3.3 Image Optimization
- [ ] Images compressed and optimized
- [ ] Responsive images (srcset) implemented
- [ ] WebP format with fallbacks used
- [ ] Image dimensions specified in HTML
- [ ] No oversized images
- [ ] CDN delivery configured

### 3.4 Image Content Review
- [ ] All images are high quality
- [ ] Images match brand guidelines
- [ ] No copyright violations
- [ ] Diverse and inclusive representation
- [ ] Images support the surrounding content
- [ ] No placeholder/lorem ipsum images

**Image Issues:**
```
[Document any image-related issues]
```

---

## 4. CTA Consistency Review

### 4.1 Primary CTAs
- [ ] Consistent primary CTA text across sections
- [ ] Consistent button styling
- [ ] Clear value proposition in each CTA
- [ ] Proper hierarchy (primary vs secondary CTAs)
- [ ] CTA placement follows best practices

### 4.2 CTA Inventory
| Location | CTA Text | Button Style | Destination | Status |
|----------|----------|--------------|-------------|--------|
| Hero | | | | [ ] OK |
| Features | | | | [ ] OK |
| Pricing | | | | [ ] OK |
| Footer | | | | [ ] OK |

### 4.3 CTA Best Practices
- [ ] CTAs use action-oriented language
- [ ] Benefits are clear to user
- [ ] No generic "Click Here" or "Submit" text
- [ ] Contrast and visibility adequate
- [ ] Mobile-friendly touch targets (min 44x44px)
- [ ] Loading states implemented
- [ ] Disabled states are clear

**CTA Recommendations:**
```
[Document any suggested improvements to CTAs]
```

---

## 5. Testimonial Attribution Verification

### 5.1 Attribution Completeness
- [ ] All testimonials have author names
- [ ] Job titles/roles included where appropriate
- [ ] Company names included where appropriate
- [ ] Photos/avatars present (if applicable)
- [ ] Dates or timeframes noted

### 5.2 Permission and Compliance
- [ ] Written permission obtained for all testimonials
- [ ] Permission documentation filed and accessible
- [ ] Photo usage rights confirmed
- [ ] No false or fabricated testimonials
- [ ] Testimonials comply with FTC guidelines
- [ ] Attribution matches permission records

### 5.3 Testimonial Quality
- [ ] Testimonials are authentic and specific
- [ ] Diverse range of customers represented
- [ ] Testimonials address different pain points
- [ ] No overly promotional language
- [ ] Testimonials are recent and relevant

**Testimonial Verification Log:**
| Testimonial Author | Company | Permission Obtained | Date | Verified By |
|--------------------|---------|---------------------|------|-------------|
| | | [ ] Yes | | |

---

## 6. Brand Voice and Messaging Consistency

### 6.1 Tone and Voice
- [ ] Tone matches brand guidelines
- [ ] Consistent voice across all sections
- [ ] Appropriate formality level maintained
- [ ] Person (1st, 2nd, 3rd) used consistently
- [ ] Active voice preferred over passive

### 6.2 Messaging Alignment
- [ ] Value proposition clearly stated
- [ ] Key messages appear consistently
- [ ] No contradictory claims
- [ ] Feature descriptions align with product
- [ ] Benefits match customer needs
- [ ] Technical accuracy verified

### 6.3 Brand Elements
- [ ] Company name used correctly
- [ ] Product names capitalized properly
- [ ] Tagline appears consistently
- [ ] Key terminology used correctly
- [ ] No competitor mentions (unless intentional)

**Brand Voice Issues:**
```
[Document any inconsistencies or concerns]
```

---

## 7. SEO Metadata Review

### 7.1 Page Titles
- [ ] All pages have unique titles
- [ ] Titles are 50-60 characters
- [ ] Primary keyword included in title
- [ ] Brand name included consistently
- [ ] Title is compelling and accurate

### 7.2 Meta Descriptions
- [ ] All pages have meta descriptions
- [ ] Descriptions are 150-160 characters
- [ ] Includes target keywords naturally
- [ ] Includes call-to-action
- [ ] Unique for each page
- [ ] Accurately describes page content

### 7.3 Open Graph / Social Media
- [ ] og:title tags present
- [ ] og:description tags present
- [ ] og:image tags with proper images
- [ ] og:url tags present
- [ ] Twitter card tags configured
- [ ] Social share preview tested
- [ ] Images meet platform requirements (1200x630px)

### 7.4 Technical SEO
- [ ] Canonical tags implemented
- [ ] Structured data/schema markup added
- [ ] XML sitemap generated
- [ ] robots.txt configured
- [ ] No duplicate content issues

**SEO Metadata Audit:**
| Page | Title Length | Description Length | OG Image | Issues |
|------|--------------|-------------------|----------|---------|
| Home | | | [ ] OK | |
| Pricing | | | [ ] OK | |

---

## 8. Form Copy and Error Messages Review

### 8.1 Form Labels
- [ ] All form fields have clear labels
- [ ] Required fields marked appropriately
- [ ] Help text provided where needed
- [ ] Labels are concise but descriptive
- [ ] Consistent terminology across forms

### 8.2 Placeholder Text
- [ ] Placeholders provide helpful examples
- [ ] Placeholders don't replace labels
- [ ] Format examples clear (dates, phone, etc.)
- [ ] Not used for critical information

### 8.3 Error Messages
- [ ] Error messages are specific and helpful
- [ ] Messages explain what went wrong
- [ ] Messages provide guidance on fixing
- [ ] Tone is friendly, not accusatory
- [ ] No technical jargon in user-facing errors
- [ ] Inline validation messages clear

### 8.4 Success Messages
- [ ] Confirmation messages are clear
- [ ] Next steps explained to user
- [ ] Tone is positive and encouraging
- [ ] Consistent styling and placement

**Form Copy Review:**
| Form | Purpose | Labels Clear | Errors Helpful | Success Message | Status |
|------|---------|--------------|----------------|-----------------|--------|
| Contact | | [ ] Yes | [ ] Yes | [ ] Yes | [ ] OK |
| Newsletter | | [ ] Yes | [ ] Yes | [ ] Yes | [ ] OK |

---

## 9. Mobile Content Readability Check

### 9.1 Text Readability
- [ ] Font size minimum 16px on mobile
- [ ] Line height adequate (1.5+)
- [ ] Paragraph width comfortable (45-75 characters)
- [ ] Sufficient contrast (4.5:1 minimum)
- [ ] No horizontal scrolling required

### 9.2 Content Structure
- [ ] Headings create clear hierarchy
- [ ] Short paragraphs (2-3 sentences)
- [ ] Bullet points used for scanability
- [ ] Important info not hidden in long text blocks
- [ ] White space used effectively

### 9.3 Mobile-Specific Considerations
- [ ] Touch targets adequate size (44x44px min)
- [ ] No hover-dependent content
- [ ] Forms easy to complete on mobile
- [ ] Modals/popups mobile-friendly
- [ ] Content doesn't get cut off
- [ ] Images scale appropriately

### 9.4 Device Testing
- [ ] Tested on iOS Safari
- [ ] Tested on Android Chrome
- [ ] Tested on tablet sizes
- [ ] Tested in portrait and landscape
- [ ] Tested with different text sizes

**Mobile Content Issues:**
```
[Document any mobile readability concerns]
```

---

## 10. Content Approval Workflow

### 10.1 Review Process
| Stage | Reviewer | Date | Status | Comments |
|-------|----------|------|--------|----------|
| Initial Draft | | | [ ] Complete | |
| Content Team Review | | | [ ] Complete | |
| Marketing Review | | | [ ] Complete | |
| Legal Review | | | [ ] Complete | |
| Executive Review | | | [ ] Complete | |
| Final Approval | | | [ ] Complete | |

### 10.2 Stakeholder Sign-Off

**Content Team Lead**
- Name: ___________________________
- Signature: ________________________
- Date: ___________________________

**Marketing Director**
- Name: ___________________________
- Signature: ________________________
- Date: ___________________________

**Legal Counsel**
- Name: ___________________________
- Signature: ________________________
- Date: ___________________________

**Executive Sponsor**
- Name: ___________________________
- Signature: ________________________
- Date: ___________________________

### 10.3 Outstanding Issues
- [ ] All critical issues resolved
- [ ] All medium priority issues addressed or scheduled
- [ ] Low priority issues documented for future iteration

**Open Issues Log:**
| Issue # | Description | Priority | Assigned To | Target Date | Status |
|---------|-------------|----------|-------------|-------------|--------|
| | | | | | |

---

## 11. Final Pre-Launch Checklist

- [ ] All sections of this document completed
- [ ] All stakeholder approvals obtained
- [ ] Outstanding issues logged and prioritized
- [ ] Content backup created
- [ ] Change log documented
- [ ] Launch communications prepared
- [ ] Rollback plan documented
- [ ] Post-launch review scheduled

---

## Notes and Additional Comments

```
[Use this section for any additional notes, context, or special considerations]
```

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-24 | Content Team | Initial checklist creation |
| | | | |

---

**Document Status:** [ ] Draft [ ] In Review [ ] Approved [ ] Archived

**Next Review Date:** ___________________________
