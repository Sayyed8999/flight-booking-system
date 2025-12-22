import { Router } from 'express';
import { registerController, loginController, verifySignupOtpController, setPasswordController } from './auth.controller';
import { validate } from '../../middlewares/validate';
import { registerSchema, loginSchema, verifyOtpSchema, setPasswordSchema } from './auth.validation';

const router = Router();

router.post('/register', validate(registerSchema), registerController);

router.post(
    '/verify-signup-otp',
    validate(verifyOtpSchema),
    verifySignupOtpController
);

router.post(
    '/set-password',
    validate(setPasswordSchema),
    setPasswordController
);


router.post('/login', validate(loginSchema), loginController);

export default router;
