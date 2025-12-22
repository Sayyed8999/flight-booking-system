import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightsState } from './flights.state';

export const selectFlightsState =
    createFeatureSelector<FlightsState>('flights');

export const selectFlightResults = createSelector(
    selectFlightsState,
    s => s.results
);

export const selectFlightsLoading = createSelector(
    selectFlightsState,
    s => s.loading
);

export const selectFlightsError = createSelector(
    selectFlightsState,
    s => s.error
);
