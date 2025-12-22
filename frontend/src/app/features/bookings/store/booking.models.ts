export interface Flight {
    _id: string;
    airline: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    durationMinutes: number;
    price: number;
}

export interface Passenger {
    name: string;
    age: number;
    gender: string;
    seatPreference?: 'WINDOW' | 'AISLE' | 'MIDDLE' | 'NONE';
    seatNumber?: string;
}

export interface Booking {
    _id: string;
    bookingRef: string;
    flight: Flight;
    passengers: Passenger[];
    status: 'CONFIRMED' | 'CANCELLED';
    createdAt: string;
}
