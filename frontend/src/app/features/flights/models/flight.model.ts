export interface Flight {
    _id: string;
    flightNumber: string;
    airline: string;

    origin: string;
    destination: string;

    departureTime: string;
    arrivalTime: string;

    durationMinutes: number;
    price: number;

    availableSeats: {
        economy: number;
        premium: number;
        business: number;
        first: number;
    };
}
