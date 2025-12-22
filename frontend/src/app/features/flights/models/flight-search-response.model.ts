import { Flight } from './flight.model';

export interface FlightSearchResponse {
    outboundFlights: Flight[];
    returnFlights?: Flight[];
}
