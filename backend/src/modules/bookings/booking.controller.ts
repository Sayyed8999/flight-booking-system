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

export const getBookingById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const booking = await BookingModel.findOne({
        _id: id,
        userId: req.user!.id
    });

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: 'Booking not found'
        });
    }

    res.json({
        success: true,
        booking
    });
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const booking = await BookingModel.findOne({
        _id: id,
        userId: req.user!.id
    });

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: 'Booking not found'
        });
    }

    if (booking.status === 'CANCELLED') {
        return res.status(400).json({
            success: false,
            message: 'Booking already cancelled'
        });
    }

    booking.status = 'CANCELLED';
    await booking.save();

    res.json({
        success: true
    });
};