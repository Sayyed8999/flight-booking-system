import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as FlightsActions from './flights.actions';
import { FlightService } from '../services/flights.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Injectable()
export class FlightsEffects {
    private actions$ = inject(Actions);
    private api = inject(FlightService);
    private notify = inject(NotificationService);

    searchFlights$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FlightsActions.searchFlights),
            switchMap(({ payload }) =>
                this.api.search(payload).pipe(
                    map(results =>
                        FlightsActions.searchFlightsSuccess({ results })
                    ),
                    catchError(err =>
                        of(
                            FlightsActions.searchFlightsFailure({
                                error: err?.error?.message || 'Failed to search flights'
                            })
                        )
                    )
                )
            )
        )
    );


    searchFlightsFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(FlightsActions.searchFlightsFailure),
                map(({ error }) => this.notify.error(error))
            ),
        { dispatch: false }
    );
}
