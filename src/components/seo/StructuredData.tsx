import React from 'react';
import { Organization, WebSite, WithContext } from 'schema-dts';

interface StructuredDataProps {
  organizationData?: WithContext<Organization>;
  websiteData?: WithContext<WebSite>;
}

/**
 * StructuredData component for implementing JSON-LD structured data
 * Supports Organization and WebSite schema types for better SEO
 */
export default function StructuredData({
  organizationData,
  websiteData
}: StructuredDataProps) {
  const defaultOrganization: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Epic Landing Page',
    url: 'https://epic-landing-page.com',
    logo: 'https://epic-landing-page.com/logo.png',
    description: 'Create stunning landing pages that convert visitors into customers',
    sameAs: [
      'https://twitter.com/epiclanding',
      'https://www.facebook.com/epiclanding',
      'https://www.linkedin.com/company/epiclanding'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@epic-landing-page.com'
    }
  };

  const defaultWebsite: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Epic Landing Page',
    url: 'https://epic-landing-page.com',
    description: 'Create stunning landing pages that convert visitors into customers'
  };

  const organization = organizationData || defaultOrganization;
  const website = websiteData || defaultWebsite;

  return (
    <>
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization)
        }}
      />

      {/* Website Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website)
        }}
      />
    </>
  );
}
