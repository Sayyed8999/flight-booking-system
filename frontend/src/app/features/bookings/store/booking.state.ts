import { Booking, Flight, Passenger } from './booking.models';

export interface BookingState {
    selectedFlight: Flight | null;
    passengers: Passenger[];
    contactEmail?: string | null;
    contactPhone?: string | null;
    booking: Booking | null;
    bookings: Booking[];
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
    loading: false,
    error: null
};
