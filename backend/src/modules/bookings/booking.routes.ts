import { Router } from 'express';
import { cancelBooking, createBooking, getBookingById, getMyBookings } from './booking.controller';
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

router.get('/:id', authMiddleware, getBookingById);

router.patch('/:id/cancel', authMiddleware, cancelBooking);


export default router;
