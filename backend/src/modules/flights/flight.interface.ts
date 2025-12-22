export interface Flight {
    flightNumber: string;
    airline: string;

    origin: string;
    destination: string;

    departureTime: Date;
    arrivalTime: Date;

    durationMinutes: number;

    price: number;

    availableSeats: {
        economy: number;
        premium: number;
        business: number;
        first: number;
    };
}