import { Router } from 'express';
import { getMyProfile, updateMyProfile } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { updateProfileSchema } from './user.validation';
import { validate } from '../../middlewares/validate';

const router = Router();

router.get('/me', authMiddleware, getMyProfile);

router.patch(
    '/me',
    authMiddleware,
    validate(updateProfileSchema),
    updateMyProfile
);

export default router;
