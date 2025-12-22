import { sendTicketEmail } from '../../utils/sendTicketEmail';
import { generateTicketPdf } from '../../utils/ticketPdf';
import { UserModel } from '../users/users.model';
import { BookingModel } from './booking.model';
import crypto from 'crypto';


export class BookingService {
    static async createBooking(userId: string, data: any) {
        const bookingRef = `FB-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

        const booking = await BookingModel.create({
            ...data,
            bookingRef,
            status: 'CONFIRMED',
            userId
        });

        const user = await UserModel.findById(userId).select('email');

        if (user?.email) {
            const pdfBuffer = await generateTicketPdf(booking);

            await sendTicketEmail(user.email, pdfBuffer, bookingRef);
        }

        return booking;
    }
}
