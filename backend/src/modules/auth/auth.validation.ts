import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.string().email()
    })
});

export const verifyOtpSchema = z.object({
    body: z.object({
        email: z.string().email(),
        otp: z.string().length(6)
    })
});

export const setPasswordSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6)
    })
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
});
