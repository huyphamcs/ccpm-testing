'use client';

/**
 * Google Analytics 4 Component
 *
 * This component integrates Google Analytics 4 (GA4) with Next.js.
 * It uses the @next/third-parties package for optimized loading and
 * automatically tracks pageviews.
 *
 * Features:
 * - Optimized script loading with next/third-parties
 * - Automatic scroll depth tracking
 * - GDPR compliance support
 * - Development mode logging
 */

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';
import { useEffect } from 'react';
import { initScrollDepthTracking, hasAnalyticsConsent } from '@/lib/analytics';

export interface GoogleAnalyticsProps {
  /**
   * Google Analytics 4 Measurement ID
   * Format: G-XXXXXXXXXX
   */
  measurementId?: string;
}

/**
 * GoogleAnalytics Component
 *
 * Renders the GA4 tracking script and initializes scroll depth tracking.
 *
 * @example
 * ```tsx
 * // In your layout.tsx
 * import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <GoogleAnalytics />
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Get measurement ID from props or environment variable
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Only initialize scroll tracking if we have consent and a measurement ID
    if (!gaId || !hasAnalyticsConsent()) {
      return;
    }

    // Initialize scroll depth tracking
    const cleanup = initScrollDepthTracking();

    // Cleanup on unmount
    return cleanup;
  }, [gaId]);

  // Don't render if no measurement ID is provided
  if (!gaId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[GoogleAnalytics] No measurement ID provided. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in your environment variables.'
      );
    }
    return null;
  }

  // Don't load analytics if consent hasn't been granted
  if (!hasAnalyticsConsent()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[GoogleAnalytics] Analytics consent not granted. Skipping GA4 initialization.');
    }
    return null;
  }

  return <NextGoogleAnalytics gaId={gaId} />;
}

/**
 * Export default for easier imports
 */
export default GoogleAnalytics;
