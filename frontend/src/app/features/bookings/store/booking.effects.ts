import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, map, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as BookingActions from './booking.actions';
import { selectPassengerDetails, selectSelectedFlight } from './booking.selectors';
import { BookingApiService } from '../services/booking-api.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Injectable()
export class BookingEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private api = inject(BookingApiService);
    private router = inject(Router);
    private notify = inject(NotificationService);

    selectFlight$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(BookingActions.selectFlight),
                tap(() => {
                    this.router.navigate(['/bookings/new']);
                })
            ),
        { dispatch: false }
    );


    createBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.createBooking),

            withLatestFrom(
                this.store.select(selectSelectedFlight),
                this.store.select(selectPassengerDetails)
            ),

            switchMap(([_, flight, passengerDetails]) => {
                if (!flight) {
                    return of(
                        BookingActions.createBookingFailure({
                            error: 'No flight selected'
                        })
                    );
                }

                const payload = {
                    flight,
                    ...passengerDetails
                };

                return this.api.createBooking(payload).pipe(
                    map(res =>
                        BookingActions.createBookingSuccess({ booking: res.booking })
                    ),
                    catchError(err =>
                        of(
                            BookingActions.createBookingFailure({
                                error:
                                    err?.error?.message ||
                                    'Unable to create booking. Please try again.'
                            })
                        )
                    )
                );
            })
        )
    );

    createBookingSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(BookingActions.createBookingSuccess),
                tap(() => {
                    this.notify.success('Booking confirmed!');
                    this.router.navigate(['/bookings/success']);
                })
            ),
        { dispatch: false }
    );

    createBookingFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(BookingActions.createBookingFailure),
                tap(({ error }) => {
                    this.notify.error(error);
                })
            ),
        { dispatch: false }
    );

    loadMyBookings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.loadMyBookings),
            switchMap(() =>
                this.api.getMyBookings().pipe(
                    map(res =>
                        BookingActions.loadMyBookingsSuccess({ bookings: res.bookings })
                    ),
                    catchError(err =>
                        of(
                            BookingActions.loadMyBookingsFailure({
                                error: err?.error?.message || 'Failed to load bookings'
                            })
                        )
                    )
                )
            )
        )
    );

    loadMyBookingsFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(BookingActions.loadMyBookingsFailure),
                tap(({ error }) => this.notify.error(error))
            ),
        { dispatch: false }
    );


    loadBookingById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.loadBookingById),
            switchMap(({ bookingId }) =>
                this.api.getBookingById(bookingId).pipe(
                    map(res =>
                        BookingActions.loadBookingByIdSuccess({ booking: res.booking })
                    ),
                    catchError(err =>
                        of(
                            BookingActions.loadBookingByIdFailure({
                                error: err?.error?.message || 'Failed to load booking'
                            })
                        )
                    )
                )
            )
        )
    );

    loadBookingByIdFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(BookingActions.loadBookingByIdFailure),
                tap(({ error }) => {
                    this.notify.error(error);
                })
            ),
        { dispatch: false }
    );


    cancelBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.cancelBooking),
            switchMap(({ bookingId }) =>
                this.api.cancelBooking(bookingId).pipe(
                    map(() =>
                        BookingActions.cancelBookingSuccess({ bookingId })
                    ),
                    catchError(err =>
                        of(
                            BookingActions.cancelBookingFailure({
                                error: err?.error?.message || 'Failed to cancel booking'
                            })
                        )
                    )
                )
            )
        )
    );

    cancelBookingSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(BookingActions.cancelBookingSuccess),
                tap(() => {
                    this.notify.success('Booking cancelled successfully');
                    this.router.navigate(['/bookings']);
                })
            ),
        { dispatch: false }
    );

    cancelBookingFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(BookingActions.cancelBookingFailure),
                tap(({ error }) => {
                    this.notify.error(error);
                })
            ),
        { dispatch: false }
    );



}
