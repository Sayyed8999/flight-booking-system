import { Booking, Flight, Passenger } from './booking.models';

export interface BookingState {
    selectedFlight: Flight | null;
    passengers: Passenger[];
    contactEmail?: string | null;
    contactPhone?: string | null;
    booking: Booking | null;
    bookings: Booking[];
    selectedBooking: any;
    loading: boolean;
    error: string | null;
}

export const initialBookingState: BookingState = {
    selectedFlight: null,
    passengers: [],
    bookings: [],
    contactEmail: null,
    contactPhone: null,
    booking: null,
    selectedBooking: null,
    loading: false,
    error: null
};
