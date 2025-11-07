// @ts-nocheck
/**
 * Monitoring & Error Tracking Utilities
 *
 * This module provides production-ready utilities for error tracking,
 * performance monitoring, and custom event tracking using Sentry and
 * other monitoring platforms.
 */

import { logger } from './logger';

// Extend Window interface for Sentry and monitoring tools
declare global {
  interface Window {
    Sentry?: any; // Using 'any' instead of import(`@sentry/nextjs`).catch(() => null) to avoid TypeScript errors when Sentry is not installed
  }
}

/**
 * IMPORTANT: Sentry monitoring is currently disabled
 * To enable, install @sentry/nextjs: npm install @sentry/nextjs
 *
 * All Sentry-related code has been commented out to allow builds without the package.
 * This is intentional for bundle optimization - Sentry will be added when monitoring is needed.
 */
const SENTRY_ENABLED = false;

/**
 * Sentry configuration options
 */
export interface SentryConfig {
  dsn: string;
  environment: string;
  tracesSampleRate?: number;
  replaysSessionSampleRate?: number;
  replaysOnErrorSampleRate?: number;
  enabled?: boolean;
  debug?: boolean;
}

/**
 * Performance monitoring options
 */
export interface PerformanceConfig {
  enableWebVitals: boolean;
  enableCustomMetrics: boolean;
  sampleRate?: number;
}

/**
 * Custom event parameters for monitoring
 */
export interface CustomEventParams {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

/**
 * Error severity levels
 */
export type ErrorSeverity = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

/**
 * Error context for better debugging
 */
export interface ErrorContext {
  user?: {
    id?: string;
    email?: string;
    username?: string;
  };
  tags?: Record<string, string>;
  extra?: Record<string, any>;
  level?: ErrorSeverity;
}

/**
 * Web Vitals metrics
 */
export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Initialize Sentry for error tracking
 *
 * @param config - Sentry configuration options
 *
 * @example
 * ```tsx
 * initSentry({
 *   dsn: process.env.NEXT_PUBLIC_SENTRY_DSN!,
 *   environment: process.env.NODE_ENV,
 *   tracesSampleRate: 0.1,
 *   replaysSessionSampleRate: 0.1,
 *   replaysOnErrorSampleRate: 1.0,
 * });
 * ```
 */
export const initSentry = (config: SentryConfig): void => {
  if (!SENTRY_ENABLED) {
    logger.info('Sentry monitoring is disabled (package not installed)');
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  // Only initialize if enabled and DSN is provided
  if (!config.enabled && process.env.NODE_ENV !== 'production') {
    logger.info('Sentry monitoring disabled for non-production environment');
    return;
  }

  if (!config.dsn) {
    logger.warn('Sentry DSN not provided, error tracking disabled');
    return;
  }

  try {
    // Dynamic import of Sentry to avoid bundle bloat
    // Note: This will fail gracefully if @sentry/nextjs is not installed
    import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
      Sentry.init({
        dsn: config.dsn,
        environment: config.environment,

        // Performance Monitoring
        tracesSampleRate: config.tracesSampleRate ?? 0.1, // 10% of transactions

        // Session Replay
        replaysSessionSampleRate: config.replaysSessionSampleRate ?? 0.1, // 10% of sessions
        replaysOnErrorSampleRate: config.replaysOnErrorSampleRate ?? 1.0, // 100% when errors occur

        // Debug mode
        debug: config.debug ?? false,

        // Integrations
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],

        // Filter out known non-critical errors
        beforeSend(event, hint) {
          // Filter out browser extension errors
          if (
            event.exception?.values?.[0]?.value?.includes('chrome-extension://') ||
            event.exception?.values?.[0]?.value?.includes('moz-extension://')
          ) {
            return null;
          }

          // Filter out network errors from ad blockers
          if (
            event.exception?.values?.[0]?.value?.includes('Failed to fetch') ||
            event.exception?.values?.[0]?.value?.includes('NetworkError')
          ) {
            // Still log but with lower priority
            event.level = 'warning';
          }

          return event;
        },
      });

      logger.info('Sentry monitoring initialized', {
        environment: config.environment,
        tracesSampleRate: config.tracesSampleRate,
      });
    }).catch((error) => {
      logger.error('Failed to initialize Sentry', error);
    });
  } catch (error) {
    logger.error('Error during Sentry initialization', error instanceof Error ? error : undefined);
  }
};

/**
 * Capture an error with context
 *
 * @param error - The error to capture
 * @param context - Additional context for debugging
 *
 * @example
 * ```tsx
 * try {
 *   await riskyOperation();
 * } catch (error) {
 *   captureError(error, {
 *     tags: { operation: 'form-submit' },
 *     extra: { formId: 'contact-form' },
 *     level: 'error'
 *   });
 * }
 * ```
 */
export const captureError = (
  error: Error | string,
  context?: ErrorContext
): void => {
  // Log locally first
  if (error instanceof Error) {
    logger.error(error.message, error, context?.extra);
  } else {
    logger.error(error, undefined, context?.extra);
  }

  // Send to Sentry if available
  if (!SENTRY_ENABLED || typeof window === 'undefined' || !window.Sentry) {
    return;
  }

  try {
    import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
      // Set user context if provided
      if (context?.user) {
        Sentry.setUser(context.user);
      }

      // Set tags if provided
      if (context?.tags) {
        Sentry.setTags(context.tags);
      }

      // Set extra context if provided
      if (context?.extra) {
        Sentry.setContext('additional_info', context.extra);
      }

      // Capture the error
      if (error instanceof Error) {
        Sentry.captureException(error, {
          level: context?.level || 'error',
        });
      } else {
        Sentry.captureMessage(error, {
          level: context?.level || 'error',
        });
      }
    }).catch(() => {
      // Sentry not available, silently fail
    });
  } catch (error) {
    // Sentry import failed, silently fail
  }
};

/**
 * Capture a message (non-error event)
 *
 * @param message - The message to capture
 * @param level - Severity level
 * @param context - Additional context
 *
 * @example
 * ```tsx
 * captureMessage('User completed checkout', 'info', {
 *   extra: { orderId: '12345', amount: 99.99 }
 * });
 * ```
 */
export const captureMessage = (
  message: string,
  level: ErrorSeverity = 'info',
  context?: ErrorContext
): void => {
  logger.info(message, context?.extra);

  if (typeof window !== 'undefined' && window.Sentry) {
    import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
      if (context?.tags) {
        Sentry.setTags(context.tags);
      }

      if (context?.extra) {
        Sentry.setContext('additional_info', context.extra);
      }

      Sentry.captureMessage(message, level);
    });
  }
};

/**
 * Create an Error Boundary helper for React components
 *
 * @param componentName - Name of the component for tracking
 * @param fallback - Fallback UI to render on error
 *
 * @example
 * ```tsx
 * const errorBoundary = createErrorBoundary('ContactForm', <ErrorFallback />);
 *
 * function ContactForm() {
 *   return errorBoundary.wrap(
 *     <form>...</form>
 *   );
 * }
 * ```
 */
export const createErrorBoundary = (
  componentName: string,
  fallback?: React.ReactNode
) => {
  return {
    componentDidCatch: (error: Error, errorInfo: React.ErrorInfo) => {
      captureError(error, {
        tags: {
          component: componentName,
          errorBoundary: 'true',
        },
        extra: {
          componentStack: errorInfo.componentStack,
        },
        level: 'error',
      });
    },
    fallback,
  };
};

/**
 * Set user context for error tracking
 *
 * @param user - User information
 *
 * @example
 * ```tsx
 * setUser({
 *   id: user.id,
 *   email: user.email,
 *   username: user.username
 * });
 * ```
 */
export const setUser = (user: {
  id?: string;
  email?: string;
  username?: string;
} | null): void => {
  if (typeof window !== 'undefined' && window.Sentry) {
    import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
      Sentry.setUser(user);
    });
  }
};

/**
 * Track custom events for monitoring
 *
 * @param params - Event parameters
 *
 * @example
 * ```tsx
 * trackCustomEvent({
 *   category: 'engagement',
 *   action: 'feature_used',
 *   label: 'dark_mode_toggle',
 *   value: 1,
 *   metadata: { location: 'header' }
 * });
 * ```
 */
export const trackCustomEvent = (params: CustomEventParams): void => {
  logger.info('Custom event tracked', {
    category: params.category,
    action: params.action,
    label: params.label,
    value: params.value,
    ...params.metadata,
  });

  // Send to Sentry as breadcrumb
  if (typeof window !== 'undefined' && window.Sentry) {
    import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
      Sentry.addBreadcrumb({
        category: params.category,
        message: params.action,
        level: 'info',
        data: {
          label: params.label,
          value: params.value,
          ...params.metadata,
        },
      });
    });
  }
};

/**
 * Initialize Web Vitals monitoring
 *
 * Tracks Core Web Vitals (CLS, FID, LCP) and other performance metrics
 *
 * @param onMetric - Callback function to handle metrics
 *
 * @example
 * ```tsx
 * // In _app.tsx or layout.tsx
 * useEffect(() => {
 *   initWebVitals((metric) => {
 *     // Send to analytics
 *     console.log(metric);
 *   });
 * }, []);
 * ```
 */
export const initWebVitals = (
  onMetric: (metric: WebVitalsMetric) => void
): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS((metric) => {
        const vitalsMetric: WebVitalsMetric = {
          name: 'CLS',
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
        };
        onMetric(vitalsMetric);

        // Send to Sentry
        if (window.Sentry) {
          import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
            Sentry.setMeasurement('CLS', metric.value, 'none');
          });
        }
      });

      onFID((metric) => {
        const vitalsMetric: WebVitalsMetric = {
          name: 'FID',
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
        };
        onMetric(vitalsMetric);

        if (window.Sentry) {
          import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
            Sentry.setMeasurement('FID', metric.value, 'millisecond');
          });
        }
      });

      onFCP((metric) => {
        const vitalsMetric: WebVitalsMetric = {
          name: 'FCP',
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
        };
        onMetric(vitalsMetric);

        if (window.Sentry) {
          import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
            Sentry.setMeasurement('FCP', metric.value, 'millisecond');
          });
        }
      });

      onLCP((metric) => {
        const vitalsMetric: WebVitalsMetric = {
          name: 'LCP',
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
        };
        onMetric(vitalsMetric);

        if (window.Sentry) {
          import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
            Sentry.setMeasurement('LCP', metric.value, 'millisecond');
          });
        }
      });

      onTTFB((metric) => {
        const vitalsMetric: WebVitalsMetric = {
          name: 'TTFB',
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
        };
        onMetric(vitalsMetric);

        if (window.Sentry) {
          import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
            Sentry.setMeasurement('TTFB', metric.value, 'millisecond');
          });
        }
      });

      onINP((metric) => {
        const vitalsMetric: WebVitalsMetric = {
          name: 'INP',
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
        };
        onMetric(vitalsMetric);

        if (window.Sentry) {
          import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
            Sentry.setMeasurement('INP', metric.value, 'millisecond');
          });
        }
      });

      logger.info('Web Vitals monitoring initialized');
    }).catch((error) => {
      logger.error('Failed to initialize Web Vitals', error);
    });
  } catch (error) {
    logger.error('Error during Web Vitals initialization', error instanceof Error ? error : undefined);
  }
};

/**
 * Track performance metrics manually
 *
 * @param metricName - Name of the metric
 * @param value - Metric value
 * @param unit - Unit of measurement
 *
 * @example
 * ```tsx
 * const startTime = performance.now();
 * await fetchData();
 * const duration = performance.now() - startTime;
 * trackPerformance('data_fetch', duration, 'millisecond');
 * ```
 */
export const trackPerformance = (
  metricName: string,
  value: number,
  unit: 'millisecond' | 'second' | 'byte' | 'none' = 'millisecond'
): void => {
  logger.info(`Performance metric: ${metricName}`, { value, unit });

  if (typeof window !== 'undefined' && window.Sentry) {
    import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
      Sentry.setMeasurement(metricName, value, unit);
    });
  }
};

/**
 * Create a performance transaction for tracking
 *
 * @param name - Transaction name
 * @param operation - Type of operation
 *
 * @example
 * ```tsx
 * const transaction = startTransaction('checkout-flow', 'user-interaction');
 * try {
 *   await processCheckout();
 *   transaction.setStatus('ok');
 * } catch (error) {
 *   transaction.setStatus('error');
 *   throw error;
 * } finally {
 *   transaction.finish();
 * }
 * ```
 */
export const startTransaction = (
  name: string,
  operation: string
): {
  setStatus: (status: 'ok' | 'error' | 'cancelled') => void;
  setData: (key: string, value: any) => void;
  finish: () => void;
} => {
  const startTime = performance.now();
  let status: 'ok' | 'error' | 'cancelled' = 'ok';
  const data: Record<string, any> = {};

  return {
    setStatus: (newStatus) => {
      status = newStatus;
    },
    setData: (key, value) => {
      data[key] = value;
    },
    finish: () => {
      const duration = performance.now() - startTime;

      logger.info(`Transaction completed: ${name}`, {
        operation,
        duration,
        status,
        ...data,
      });

      if (typeof window !== 'undefined' && window.Sentry) {
        import(`@sentry/nextjs`).catch(() => null).then((Sentry) => {
          const transaction = Sentry.startTransaction({
            name,
            op: operation,
          });

          Object.entries(data).forEach(([key, value]) => {
            transaction.setData(key, value);
          });

          transaction.setStatus(status);
          transaction.finish();
        });
      }
    },
  };
};

/**
 * Monitor for specific thresholds and alert
 *
 * @param metricName - Name of the metric to monitor
 * @param value - Current value
 * @param threshold - Threshold value
 * @param comparison - Comparison operator
 *
 * @example
 * ```tsx
 * const errorRate = calculateErrorRate();
 * monitorThreshold('error_rate', errorRate, 5, 'greater');
 * ```
 */
export const monitorThreshold = (
  metricName: string,
  value: number,
  threshold: number,
  comparison: 'greater' | 'less' = 'greater'
): void => {
  const exceeded =
    comparison === 'greater' ? value > threshold : value < threshold;

  if (exceeded) {
    const message = `Threshold exceeded for ${metricName}: ${value} (threshold: ${threshold})`;

    logger.warn(message, { metricName, value, threshold, comparison });

    captureMessage(message, 'warning', {
      tags: {
        type: 'threshold_alert',
        metric: metricName,
      },
      extra: {
        value,
        threshold,
        comparison,
      },
    });
  }
};

/**
 * Export monitoring interface for type-safe usage
 */
export interface MonitoringInterface {
  initSentry: typeof initSentry;
  captureError: typeof captureError;
  captureMessage: typeof captureMessage;
  setUser: typeof setUser;
  trackCustomEvent: typeof trackCustomEvent;
  initWebVitals: typeof initWebVitals;
  trackPerformance: typeof trackPerformance;
  startTransaction: typeof startTransaction;
  monitorThreshold: typeof monitorThreshold;
}

/**
 * Default monitoring instance
 */
export const monitoring: MonitoringInterface = {
  initSentry,
  captureError,
  captureMessage,
  setUser,
  trackCustomEvent,
  initWebVitals,
  trackPerformance,
  startTransaction,
  monitorThreshold,
};
