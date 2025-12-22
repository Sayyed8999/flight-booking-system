import { createAction, props } from '@ngrx/store';
import { FlightSearchResponse } from '../models/flight-search-response.model';

export enum FlightsActionTypes {
    SEARCH = '[Flights] Search',
    SEARCH_SUCCESS = '[Flights] Search Success',
    SEARCH_FAILURE = '[Flights] Search Failure',
    CLEAR = '[Flights] Clear'
}

export const searchFlights = createAction(
    FlightsActionTypes.SEARCH,
    props<{ payload: any }>()
);

export const searchFlightsSuccess = createAction(
    FlightsActionTypes.SEARCH_SUCCESS,
    props<{ results: FlightSearchResponse }>()
);

export const searchFlightsFailure = createAction(
    FlightsActionTypes.SEARCH_FAILURE,
    props<{ error: string }>()
);

export const clearFlights = createAction(FlightsActionTypes.CLEAR);
