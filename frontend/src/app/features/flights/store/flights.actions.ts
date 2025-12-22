import { createAction, props } from '@ngrx/store';
import { FlightSearchResponse } from '../models/flight-search-response.model';

export const searchFlights = createAction(
    '[Flights] Search',
    props<{ payload: any }>()
);

export const searchFlightsSuccess = createAction(
    '[Flights] Search Success',
    props<{ results: FlightSearchResponse }>()
);

export const searchFlightsFailure = createAction(
    '[Flights] Search Failure',
    props<{ error: string }>()
);

export const clearFlights = createAction('[Flights] Clear');
