/**
 * Google Analytics 4 Event Tracking Utilities
 *
 * This module provides TypeScript-safe utilities for tracking custom events
 * in Google Analytics 4. It includes event tracking for CTA clicks, form
 * submissions, and scroll depth.
 */

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string | Date | 'default' | 'update',
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Event parameters for CTA click tracking
 */
export interface CTAClickEvent {
  cta_location: string; // Where the CTA is located (hero, pricing, footer, etc.)
  cta_text: string;     // The text/label of the CTA
  cta_url?: string;     // Destination URL if applicable
}

/**
 * Event parameters for form submission tracking
 */
export interface FormSubmitEvent {
  form_name: string;    // Name/type of the form (contact, newsletter, demo, etc.)
  form_location: string; // Where the form is located
  success: boolean;     // Whether submission was successful
  error_message?: string; // Error message if submission failed
}

/**
 * Event parameters for scroll depth tracking
 */
export interface ScrollDepthEvent {
  scroll_depth: number; // Percentage scrolled (25, 50, 75, 100)
  page_path: string;    // Path of the page being scrolled
}

/**
 * Event parameters for page view tracking
 */
export interface PageViewEvent {
  page_path: string;
  page_title: string;
}

/**
 * Generic event tracking function
 *
 * @param eventName - The name of the event to track
 * @param eventParams - Parameters associated with the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  } else if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', eventName, eventParams);
  }
};

/**
 * Track CTA (Call-to-Action) button clicks
 *
 * @example
 * ```tsx
 * <button onClick={() => trackCTAClick({
 *   cta_location: 'hero',
 *   cta_text: 'Get Started',
 *   cta_url: '/signup'
 * })}>
 *   Get Started
 * </button>
 * ```
 */
export const trackCTAClick = (params: CTAClickEvent): void => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: params.cta_text,
    cta_location: params.cta_location,
    cta_text: params.cta_text,
    cta_url: params.cta_url,
  });
};

/**
 * Track form submissions
 *
 * @example
 * ```tsx
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   try {
 *     await submitForm(data);
 *     trackFormSubmit({
 *       form_name: 'contact',
 *       form_location: 'footer',
 *       success: true
 *     });
 *   } catch (error) {
 *     trackFormSubmit({
 *       form_name: 'contact',
 *       form_location: 'footer',
 *       success: false,
 *       error_message: error.message
 *     });
 *   }
 * };
 * ```
 */
export const trackFormSubmit = (params: FormSubmitEvent): void => {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: params.form_name,
    form_name: params.form_name,
    form_location: params.form_location,
    success: params.success,
    error_message: params.error_message,
  });
};

/**
 * Track scroll depth milestones
 *
 * This function is typically called by a scroll depth tracker that monitors
 * when users reach certain scroll percentages (25%, 50%, 75%, 100%)
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const handleScroll = () => {
 *     const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
 *     if (scrollPercent >= 25 && !milestones.has(25)) {
 *       trackScrollDepth({ scroll_depth: 25, page_path: window.location.pathname });
 *       milestones.add(25);
 *     }
 *   };
 *   window.addEventListener('scroll', handleScroll);
 *   return () => window.removeEventListener('scroll', handleScroll);
 * }, []);
 * ```
 */
export const trackScrollDepth = (params: ScrollDepthEvent): void => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${params.scroll_depth}%`,
    scroll_depth: params.scroll_depth,
    page_path: params.page_path,
  });
};

/**
 * Track custom page views
 *
 * Note: Page views are automatically tracked by GA4, but this function
 * can be used for tracking virtual page views in SPAs
 */
export const trackPageView = (params: PageViewEvent): void => {
  trackEvent('page_view', {
    page_path: params.page_path,
    page_title: params.page_title,
  });
};

/**
 * Initialize scroll depth tracking
 *
 * Sets up event listeners to automatically track when users reach
 * scroll depth milestones (25%, 50%, 75%, 100%)
 *
 * @returns Cleanup function to remove event listeners
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const cleanup = initScrollDepthTracking();
 *   return cleanup;
 * }, []);
 * ```
 */
export const initScrollDepthTracking = (): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const milestones = new Set<number>();
  const scrollDepthMilestones = [25, 50, 75, 100];

  const handleScroll = (): void => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Calculate scroll percentage
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    // Check each milestone
    scrollDepthMilestones.forEach((milestone) => {
      if (scrollPercent >= milestone && !milestones.has(milestone)) {
        milestones.add(milestone);
        trackScrollDepth({
          scroll_depth: milestone,
          page_path: window.location.pathname,
        });
      }
    });
  };

  // Throttle scroll events for performance
  let ticking = false;
  const throttledHandleScroll = (): void => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledHandleScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', throttledHandleScroll);
  };
};

/**
 * Check if analytics consent has been granted
 *
 * This is a placeholder for GDPR compliance. In production, this should
 * check actual consent status from a cookie consent banner.
 */
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check for consent cookie (implement based on your consent management platform)
  // For now, we'll default to true in development and require explicit consent in production
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // Check localStorage or cookie for consent
  try {
    const consent = localStorage.getItem('analytics_consent');
    return consent === 'granted';
  } catch {
    return false;
  }
};

/**
 * Grant analytics consent
 *
 * Call this when user accepts analytics cookies
 */
export const grantAnalyticsConsent = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem('analytics_consent', 'granted');

    // Update gtag consent mode if available
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  } catch (error) {
    console.error('Failed to grant analytics consent:', error);
  }
};

/**
 * Revoke analytics consent
 *
 * Call this when user rejects analytics cookies
 */
export const revokeAnalyticsConsent = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem('analytics_consent');

    // Update gtag consent mode if available
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  } catch (error) {
    console.error('Failed to revoke analytics consent:', error);
  }
};
