import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingState } from './booking.state';
import { BOOKING_FEATURE_KEY } from './booking.reducer';

export const selectBookingState =
    createFeatureSelector<BookingState>(BOOKING_FEATURE_KEY);

export const selectSelectedFlight = createSelector(
    selectBookingState,
    state => state.selectedFlight
);

export const selectPassengerDetails = createSelector(
    selectBookingState,
    state => ({
        passengers: state.passengers,
        contactEmail: state.contactEmail,
        contactPhone: state.contactPhone
    })
);

export const selectBooking = createSelector(
    selectBookingState,
    state => state.booking
);

export const selectMyBookings = createSelector(
    selectBookingState,
    state => state.bookings
);

export const selectBookingLoading = createSelector(
    selectBookingState,
    state => state.loading
);

export const selectBookingError = createSelector(
    selectBookingState,
    state => state.error
);


