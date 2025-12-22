import { TripType } from "../../../shared/utilities/enums/trip-type.enum";

export interface FlightSearchPayload {
    origin: string;
    destination: string;

    departureDate: string | null;
    returnDate: string | null;

    tripType: TripType;

    passengers: {
        adults: number;
        children: number;
        infants: number;
    };

    cabinClass: 'economy' | 'premium' | 'business' | 'first';
}
