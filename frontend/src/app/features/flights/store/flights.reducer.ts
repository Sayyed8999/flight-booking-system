import { createReducer, on } from '@ngrx/store';
import * as FlightsActions from './flights.actions';
import { initialFlightsState } from './flights.state';

export const FLIGHTS_FEATURE_KEY = 'flights';

export const flightsReducer = createReducer(
    initialFlightsState,

    on(FlightsActions.searchFlights, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(FlightsActions.searchFlightsSuccess, (state, { results }) => ({
        ...state,
        loading: false,
        results
    })),

    on(FlightsActions.searchFlightsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(FlightsActions.clearFlights, () => initialFlightsState)
);
