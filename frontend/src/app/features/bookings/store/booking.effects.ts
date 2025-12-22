import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, map, catchError, tap } from 'rxjs/operators';

import * as BookingActions from './booking.actions';
import { Store } from '@ngrx/store';
import { BookingApiService } from '../services/booking-api.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { selectPassengerDetails, selectSelectedFlight } from './booking.selectors';

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

    loadBookingById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.loadBookingById),
            switchMap(({ bookingId }) =>
                this.api.getBookingById(bookingId).pipe(
                    map(res =>
                        BookingActions.loadBookingByIdSuccess({ booking: res.booking })
                    )
                )
            )
        )
    );

    cancelBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingActions.cancelBooking),
            switchMap(({ bookingId }) =>
                this.api.cancelBooking(bookingId).pipe(
                    map(() =>
                        BookingActions.cancelBookingSuccess({ bookingId })
                    ),
                    tap(() => this.router.navigate(['/bookings']))
                )
            )
        )
    );


}
