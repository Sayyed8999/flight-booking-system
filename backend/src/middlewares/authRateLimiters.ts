import { createRateLimiter } from './rateLimiter';

export const authStrictLimiter = createRateLimiter(
    5,
    15,
    'Too many attempts. Please try again after 15 minutes.'
);

export const authModerateLimiter = createRateLimiter(
    10,
    15,
    'Too many requests. Please slow down.'
);
