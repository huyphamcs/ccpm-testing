/**
 * Rate Limiter Implementation
 *
 * In-memory rate limiting system for API endpoints.
 * Limits requests to 10 per minute per IP address.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly cleanupInterval: number = 60000; // 1 minute

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Start cleanup interval to prevent memory leaks
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanup(), this.cleanupInterval);
    }
  }

  /**
   * Check if a request should be allowed
   * @param identifier - Usually the IP address
   * @returns Object with allowed status and retry information
   */
  check(identifier: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    // No entry exists, allow request and create entry
    if (!entry || now > entry.resetTime) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });

      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime: now + this.windowMs,
      };
    }

    // Entry exists and window hasn't expired
    if (entry.count < this.maxRequests) {
      entry.count++;
      this.store.set(identifier, entry);

      return {
        allowed: true,
        remaining: this.maxRequests - entry.count,
        resetTime: entry.resetTime,
      };
    }

    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  /**
   * Reset rate limit for a specific identifier
   */
  reset(identifier: string): void {
    this.store.delete(identifier);
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Get current stats for monitoring
   */
  getStats(): { totalKeys: number; activeKeys: number } {
    const now = Date.now();
    let activeKeys = 0;

    for (const entry of this.store.values()) {
      if (now <= entry.resetTime) {
        activeKeys++;
      }
    }

    return {
      totalKeys: this.store.size,
      activeKeys,
    };
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

/**
 * Get IP address from Next.js request
 */
export function getClientIp(request: Request): string {
  // Try to get IP from various headers (in order of preference)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback (this won't work well in production behind proxy)
  return 'unknown';
}

/**
 * Rate limit middleware for API routes
 */
export async function checkRateLimit(request: Request): Promise<{
  allowed: boolean;
  headers: Record<string, string>;
  error?: { message: string; retryAfter: number };
}> {
  const ip = getClientIp(request);
  const result = rateLimiter.check(ip);

  const headers = {
    'X-RateLimit-Limit': String(10),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
  };

  if (!result.allowed) {
    return {
      allowed: false,
      headers: {
        ...headers,
        'Retry-After': String(result.retryAfter || 60),
      },
      error: {
        message: 'Too many requests. Please try again later.',
        retryAfter: result.retryAfter || 60,
      },
    };
  }

  return {
    allowed: true,
    headers,
  };
}
