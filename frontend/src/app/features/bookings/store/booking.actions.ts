import { createAction, props } from '@ngrx/store';
import { Booking, Flight, Passenger } from './booking.models';

export const selectFlight = createAction(
    '[Booking] Select Flight',
    props<{ flight: Flight }>()
);

export const savePassengers = createAction(
    '[Booking] Save Passengers',
    props<{
        contactEmail: string;
        contactPhone: string;
        passengers: Passenger[];
    }>()
);

export const createBooking = createAction('[Booking] Create Booking');

export const createBookingSuccess = createAction(
    '[Booking] Create Booking Success',
    props<{ booking: Booking }>()
);

export const createBookingFailure = createAction(
    '[Booking] Create Booking Failure',
    props<{ error: string }>()
);

export const loadMyBookings = createAction(
    '[Booking] Load My Bookings'
);

export const loadMyBookingsSuccess = createAction(
    '[Booking] Load My Bookings Success',
    props<{ bookings: Booking[] }>()
);

export const loadMyBookingsFailure = createAction(
    '[Booking] Load My Bookings Failure',
    props<{ error: string }>()
);


export const clearBooking = createAction('[Booking] Clear Booking');
