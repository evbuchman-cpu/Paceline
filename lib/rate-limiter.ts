/**
 * Simple in-memory rate limiter for API endpoints
 * For production, consider using Redis or Upstash for distributed rate limiting
 */

import { logger } from "@/lib/logger";

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum number of requests per window
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory store (will reset on server restart)
const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (record.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (e.g., user ID, IP address)
 * @param config - Rate limit configuration
 * @returns Object with allowed status and remaining requests
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
} {
  const now = Date.now();
  const key = identifier;

  // Get or create rate limit record
  let record = rateLimitStore.get(key);

  if (!record || record.resetTime < now) {
    // Create new record or reset expired one
    record = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, record);

    logger.debug("Rate limit record created", {
      identifier,
      count: 1,
      resetTime: new Date(record.resetTime).toISOString(),
    });

    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: record.resetTime,
    };
  }

  // Check if limit exceeded
  if (record.count >= config.maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000); // seconds

    logger.warn("Rate limit exceeded", {
      identifier,
      count: record.count,
      maxRequests: config.maxRequests,
      retryAfter,
    });

    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfter,
    };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(key, record);

  logger.debug("Rate limit check passed", {
    identifier,
    count: record.count,
    remaining: config.maxRequests - record.count,
  });

  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Guide generation: 3 requests per hour (expensive AI operations)
  GENERATE_GUIDE: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
  },
  // Questionnaire submission: 10 requests per hour
  QUESTIONNAIRE: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
  },
  // Strava analysis: 5 requests per hour
  STRAVA_ANALYZE: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5,
  },
  // General API: 100 requests per 15 minutes
  GENERAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
  },
} as const;

/**
 * Helper to format rate limit headers
 */
export function getRateLimitHeaders(result: ReturnType<typeof checkRateLimit>) {
  return {
    "X-RateLimit-Limit": String(result.remaining + (result.allowed ? 1 : 0)),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": new Date(result.resetTime).toISOString(),
    ...(result.retryAfter && { "Retry-After": String(result.retryAfter) }),
  };
}
