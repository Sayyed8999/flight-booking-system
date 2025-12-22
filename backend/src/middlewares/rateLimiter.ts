import rateLimit from 'express-rate-limit';

export const createRateLimiter = (
    maxRequests: number,
    windowMinutes: number,
    message: string
) =>
    rateLimit({
        windowMs: windowMinutes * 60 * 1000,
        max: maxRequests,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            success: false,
            message
        }
    });
