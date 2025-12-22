import { createAction, props } from '@ngrx/store';
import { Booking, Flight, Passenger } from './booking.models';

export enum BookingActionTypes {
    SELECT_FLIGHT = '[Booking] Select Flight',

    SAVE_PASSENGERS = '[Booking] Save Passengers',

    CREATE_BOOKING = '[Booking] Create Booking',
    CREATE_BOOKING_SUCCESS = '[Booking] Create Booking Success',
    CREATE_BOOKING_FAILURE = '[Booking] Create Booking Failure',

    LOAD_MY_BOOKINGS = '[Booking] Load My Bookings',
    LOAD_MY_BOOKINGS_SUCCESS = '[Booking] Load My Bookings Success',
    LOAD_MY_BOOKINGS_FAILURE = '[Booking] Load My Bookings Failure',

    LOAD_BOOKING_BY_ID = '[Booking] Load Booking By Id',
    LOAD_BOOKING_BY_ID_SUCCESS = '[Booking] Load Booking By Id Success',
    LOAD_BOOKING_BY_ID_FAILURE = '[Booking] Load Booking By Id Failure',

    CANCEL_BOOKING = '[Booking] Cancel Booking',
    CANCEL_BOOKING_SUCCESS = '[Booking] Cancel Booking Success',
    CANCEL_BOOKING_FAILURE = '[Booking] Cancel Booking Failure',

    CLEAR_BOOKING = '[Booking] Clear Booking'
}

export const selectFlight = createAction(
    BookingActionTypes.SELECT_FLIGHT,
    props<{ flight: Flight }>()
);

export const savePassengers = createAction(
    BookingActionTypes.SAVE_PASSENGERS,
    props<{
        contactEmail: string;
        contactPhone: string;
        passengers: Passenger[];
    }>()
);

export const createBooking = createAction(BookingActionTypes.CREATE_BOOKING);

export const createBookingSuccess = createAction(
    BookingActionTypes.CREATE_BOOKING_SUCCESS,
    props<{ booking: Booking }>()
);

export const createBookingFailure = createAction(
    BookingActionTypes.CREATE_BOOKING_FAILURE,
    props<{ error: string }>()
);

export const loadMyBookings = createAction(
    BookingActionTypes.LOAD_MY_BOOKINGS
);

export const loadMyBookingsSuccess = createAction(
    BookingActionTypes.LOAD_MY_BOOKINGS_SUCCESS,
    props<{ bookings: Booking[] }>()
);

export const loadMyBookingsFailure = createAction(
    BookingActionTypes.LOAD_MY_BOOKINGS_FAILURE,
    props<{ error: string }>()
);

export const loadBookingById = createAction(
    BookingActionTypes.LOAD_BOOKING_BY_ID,
    props<{ bookingId: string }>()
);

export const loadBookingByIdSuccess = createAction(
    BookingActionTypes.LOAD_BOOKING_BY_ID_SUCCESS,
    props<{ booking: Booking }>()
);

export const loadBookingByIdFailure = createAction(
    BookingActionTypes.LOAD_BOOKING_BY_ID_FAILURE,
    props<{ error: string }>()
);

export const cancelBooking = createAction(
    BookingActionTypes.CANCEL_BOOKING,
    props<{ bookingId: string }>()
);

export const cancelBookingSuccess = createAction(
    BookingActionTypes.CANCEL_BOOKING_SUCCESS,
    props<{ bookingId: string }>()
);

export const cancelBookingFailure = createAction(
    BookingActionTypes.CANCEL_BOOKING_FAILURE,
    props<{ error: string }>()
);


export const clearBooking = createAction(BookingActionTypes.CLEAR_BOOKING);
