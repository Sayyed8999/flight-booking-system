import { BookingModel } from './booking.model';
import crypto from 'crypto';

export class BookingService {
    static async createBooking(userId: string, data: any) {
        const bookingRef = `FB-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

        return BookingModel.create({
            ...data,
            bookingRef,
            userId
        });
    }
}
