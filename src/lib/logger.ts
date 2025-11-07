/**
 * Error Logging Utility
 *
 * Centralized logging for errors and security events
 */

type LogLevel = 'info' | 'warn' | 'error' | 'security';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  stack?: string;
}

/**
 * Format log entry for output
 */
function formatLogEntry(entry: LogEntry): string {
  const parts = [
    `[${entry.timestamp}]`,
    `[${entry.level.toUpperCase()}]`,
    entry.message,
  ];

  if (entry.context) {
    parts.push(JSON.stringify(entry.context));
  }

  if (entry.stack) {
    parts.push(`\nStack: ${entry.stack}`);
  }

  return parts.join(' ');
}

/**
 * Log to console (in production, this would send to a logging service)
 */
function writeLog(entry: LogEntry): void {
  const formatted = formatLogEntry(entry);

  switch (entry.level) {
    case 'error':
    case 'security':
      console.error(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    default:
      console.log(formatted);
  }

  // In production, send to logging service (e.g., Sentry, LogRocket, Datadog)
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with logging service
    // Example: Sentry.captureMessage(formatted, entry.level);
  }
}

/**
 * Logger class
 */
class Logger {
  info(message: string, context?: Record<string, any>): void {
    writeLog({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      context,
    });
  }

  warn(message: string, context?: Record<string, any>): void {
    writeLog({
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      context,
    });
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    writeLog({
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      context,
      stack: error?.stack,
    });
  }

  security(message: string, context?: Record<string, any>): void {
    writeLog({
      level: 'security',
      message,
      timestamp: new Date().toISOString(),
      context,
    });
  }
}

// Export singleton instance
export const logger = new Logger();

/**
 * Error handler for API routes
 */
export function handleApiError(
  error: unknown,
  context?: Record<string, any>
): { message: string; status: number } {
  if (error instanceof Error) {
    logger.error('API Error', error, context);

    // Don't expose internal errors in production
    if (process.env.NODE_ENV === 'production') {
      return {
        message: 'An internal error occurred',
        status: 500,
      };
    }

    return {
      message: error.message,
      status: 500,
    };
  }

  logger.error('Unknown error type', undefined, { error, ...context });

  return {
    message: 'An unexpected error occurred',
    status: 500,
  };
}

/**
 * Log security events
 */
export function logSecurityEvent(
  event: string,
  details: Record<string, any>
): void {
  logger.security(event, details);
}
