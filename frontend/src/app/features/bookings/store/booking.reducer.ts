import { createReducer, on } from '@ngrx/store';
import * as BookingActions from './booking.actions';
import { initialBookingState } from './booking.state';

export const BOOKING_FEATURE_KEY = 'booking';

export const bookingReducer = createReducer(
    initialBookingState,

    on(BookingActions.selectFlight, (state, { flight }) => ({
        ...state,
        selectedFlight: flight
    })),
    on(BookingActions.savePassengers, (state, payload) => ({
        ...state,
        passengers: payload.passengers,
        contactEmail: payload.contactEmail,
        contactPhone: payload.contactPhone
    })),
    on(BookingActions.createBooking, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(BookingActions.createBookingSuccess, (state, { booking }) => ({
        ...state,
        booking,
        loading: false
    })),

    on(BookingActions.createBookingFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(BookingActions.clearBooking, () => initialBookingState),

    on(BookingActions.createBookingSuccess, (state, { booking }) => ({
        ...state,
        booking,
        loading: false
    })),

    on(BookingActions.createBookingFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(BookingActions.loadMyBookings, state => ({
        ...state,
        loading: true
    })),

    on(BookingActions.loadMyBookingsSuccess, (state, { bookings }) => ({
        ...state,
        bookings,
        loading: false
    })),

    on(BookingActions.loadMyBookingsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
