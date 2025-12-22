import { FlightSearchResponse } from '../models/flight-search-response.model';

export interface FlightsState {
    loading: boolean;
    results: FlightSearchResponse | null;
    error: string | null;
    lastSearchPayload: any | null;
}

export const initialFlightsState: FlightsState = {
    loading: false,
    results: null,
    error: null,
    lastSearchPayload: null
};
