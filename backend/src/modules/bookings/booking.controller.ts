import { Response } from 'express';
import { BookingService } from './booking.service';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { BookingModel } from './booking.model';

export const createBooking = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    const booking = await BookingService.createBooking(userId, req.body);

    res.status(201).json({
        success: true,
        booking
    });
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    const bookings = await BookingModel.find({ userId })
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        bookings
    });
};