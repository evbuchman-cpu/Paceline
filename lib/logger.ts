/**
 * Structured logging utility for Paceline
 *
 * Environment-aware logging with proper security controls:
 * - Development: Verbose logging for debugging
 * - Production: Minimal, structured logs without sensitive data
 *
 * Usage:
 *   logger.debug('Detailed debug info', { context })
 *   logger.info('Important state change', { userId })
 *   logger.warn('Potential issue', { details })
 *   logger.error('Error occurred', { error, context })
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private logLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) ||
                    (this.isDevelopment ? 'debug' : 'info');
  }

  /**
   * Sanitize context to remove sensitive data
   */
  private sanitize(context?: LogContext): LogContext | undefined {
    if (!context) return undefined;

    const sanitized = { ...context };
    const sensitiveKeys = [
      'password',
      'token',
      'apiKey',
      'api_key',
      'accessToken',
      'access_token',
      'refreshToken',
      'refresh_token',
      'secret',
      'apiSecret',
      'api_secret',
      'stravaAccessToken',
      'stravaRefreshToken',
      'clientSecret',
      'client_secret',
    ];

    // Recursively sanitize nested objects
    const redact = (obj: unknown): unknown => {
      if (typeof obj !== 'object' || obj === null) return obj;

      if (Array.isArray(obj)) {
        return obj.map(redact);
      }

      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        // Check if key contains sensitive terms
        const lowerKey = key.toLowerCase();
        const isSensitive = sensitiveKeys.some(sk =>
          lowerKey.includes(sk.toLowerCase())
        );

        if (isSensitive) {
          result[key] = '[REDACTED]';
        } else if (typeof value === 'object' && value !== null) {
          result[key] = redact(value);
        } else {
          result[key] = value;
        }
      }
      return result;
    };

    return redact(sanitized);
  }

  /**
   * Format log message with timestamp and context
   */
  private format(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const sanitizedContext = this.sanitize(context);

    if (this.isDevelopment) {
      // Detailed format for development
      return context
        ? `[${timestamp}] [${level.toUpperCase()}] ${message}\n${JSON.stringify(sanitizedContext, null, 2)}`
        : `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    } else {
      // Structured JSON for production (easier to parse)
      return JSON.stringify({
        timestamp,
        level,
        message,
        ...(sanitizedContext && { context: sanitizedContext }),
      });
    }
  }

  /**
   * Check if a log level should be output
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  /**
   * Debug-level logging (development only by default)
   * Use for: Detailed debugging information, function entry/exit
   */
  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      console.debug(this.format('debug', message, context));
    }
  }

  /**
   * Info-level logging
   * Use for: Important state changes, workflow milestones
   */
  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      console.info(this.format('info', message, context));
    }
  }

  /**
   * Warning-level logging
   * Use for: Potential issues, degraded functionality
   */
  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      console.warn(this.format('warn', message, context));
    }
  }

  /**
   * Error-level logging
   * Use for: Errors, exceptions, failures
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (this.shouldLog('error')) {
      const errorContext = {
        ...context,
        ...(error instanceof Error && {
          error: {
            name: error.name,
            message: error.message,
            stack: this.isDevelopment ? error.stack : undefined,
          },
        }),
        ...(error && !(error instanceof Error) && {
          error: String(error),
        }),
      };
      console.error(this.format('error', message, errorContext));
    }
  }

  /**
   * Special method for webhook audit logging
   * Always logs regardless of log level (critical for audit trail)
   */
  audit(event: string, context: LogContext): void {
    const timestamp = new Date().toISOString();
    const sanitizedContext = this.sanitize(context);
    const auditLog = JSON.stringify({
      timestamp,
      type: 'AUDIT',
      event,
      context: sanitizedContext,
    });
    console.info(auditLog);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export type for consumers
export type { LogLevel, LogContext };
