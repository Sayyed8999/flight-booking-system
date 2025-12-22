import { Router } from 'express';
import { registerController, loginController, verifySignupOtpController, setPasswordController } from './auth.controller';
import { validate } from '../../middlewares/validate';
import { registerSchema, loginSchema, verifyOtpSchema, setPasswordSchema } from './auth.validation';
import { authModerateLimiter, authStrictLimiter } from '../../middlewares/authRateLimiters';

const router = Router();

router.post(
    '/register',
    authModerateLimiter,
    validate(registerSchema),
    registerController
);

router.post(
    '/verify-signup-otp',
    authStrictLimiter,
    validate(verifyOtpSchema),
    verifySignupOtpController
);

router.post(
    '/set-password',
    authStrictLimiter,
    validate(setPasswordSchema),
    setPasswordController
);

router.post(
    '/login',
    authStrictLimiter,
    validate(loginSchema),
    loginController
);


router.post('/login', validate(loginSchema), loginController);

export default router;
