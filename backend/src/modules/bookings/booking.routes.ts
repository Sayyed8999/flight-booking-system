import { Router } from 'express';
import { createBooking, getMyBookings } from './booking.controller';
import { validate } from '../../middlewares/validate';
import { createBookingSchema } from './booking.validation';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post(
    '/',
    authMiddleware,
    validate(createBookingSchema),
    createBooking
);

router.get(
    '/my',
    authMiddleware,
    getMyBookings
);


export default router;
