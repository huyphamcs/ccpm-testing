/**
 * Analytics utilities for tracking events
 * Compatible with Google Analytics 4
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Send custom event to Google Analytics
 * @param eventName - Name of the event
 * @param eventParams - Event parameters
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
}

/**
 * Track CTA button clicks
 * @param ctaName - Name of the CTA (e.g., "hero_start_trial")
 * @param location - Location of the CTA (e.g., "hero", "midpage", "footer")
 */
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent("cta_click", {
    cta_name: ctaName,
    location,
  });
}

/**
 * Track form submissions
 * @param formName - Name of the form (e.g., "newsletter", "signup")
 * @param success - Whether the submission was successful
 */
export function trackFormSubmission(
  formName: string,
  success: boolean
): void {
  trackEvent("form_submission", {
    form_name: formName,
    success,
  });
}

/**
 * Track scroll depth
 * @param percentage - Scroll depth percentage (25, 50, 75, 100)
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent("scroll_depth", {
    percentage,
  });
}

/**
 * Track page views
 * @param url - URL of the page
 * @param title - Title of the page
 */
export function trackPageView(url: string, title: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "", {
      page_path: url,
      page_title: title,
    });
  }
}
