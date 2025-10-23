/**
 * Structured Data (JSON-LD) component for SEO
 * Implements Schema.org vocabulary for Organization and WebSite
 */
export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YourBrand",
    url: "https://yourbrand.com",
    logo: "https://yourbrand.com/logo.png",
    description:
      "The all-in-one platform for modern teams to collaborate, automate, and deliver results faster.",
    sameAs: [
      "https://twitter.com/yourbrand",
      "https://linkedin.com/company/yourbrand",
      "https://github.com/yourbrand",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@yourbrand.com",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YourBrand",
    url: "https://yourbrand.com",
    description:
      "Streamline your workflow and 10x your productivity with our all-in-one collaboration platform.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://yourbrand.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
