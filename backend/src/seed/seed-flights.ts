import { FlightModel } from '../modules/flights/flights.model';
import { addDays, addMinutes } from '../utils/date';

export const seedFlights = async () => {
    console.log('🧹 Clearing existing flights...');
    await FlightModel.deleteMany({});

    const today = new Date();

    const delBomDep1 = addDays(today, 1, 9, 0);
    const delBomArr1 = addMinutes(delBomDep1, 130);

    const delBomDep2 = addDays(today, 1, 13, 30);
    const delBomArr2 = addMinutes(delBomDep2, 125);

    const bomDelDep1 = addDays(today, 2, 10, 0);
    const bomDelArr1 = addMinutes(bomDelDep1, 135);

    const bomDelDep2 = addDays(today, 3, 18, 0);
    const bomDelArr2 = addMinutes(bomDelDep2, 140);

    await FlightModel.insertMany([
        {
            flightNumber: 'AI-203',
            airline: 'Air India',
            origin: 'DEL',
            destination: 'BOM',
            departureTime: delBomDep1,
            arrivalTime: delBomArr1,
            durationMinutes: 130,
            price: 5200,
            availableSeats: {
                economy: 21,
                premium: 11,
                business: 1,
                first: 1
            }
        },
        {
            flightNumber: '6E-512',
            airline: 'IndiGo',
            origin: 'DEL',
            destination: 'BOM',
            departureTime: delBomDep2,
            arrivalTime: delBomArr2,
            durationMinutes: 125,
            price: 4800,
            availableSeats: {
                economy: 20,
                premium: 10,
                business: 5,
                first: 2
            }
        },
        {
            flightNumber: 'AI-204',
            airline: 'Air India',
            origin: 'BOM',
            destination: 'DEL',
            departureTime: bomDelDep1,
            arrivalTime: bomDelArr1,
            durationMinutes: 135,
            price: 5400,
            availableSeats: {
                economy: 18,
                premium: 8,
                business: 3,
                first: 1
            }
        },
        {
            flightNumber: '6E-513',
            airline: 'IndiGo',
            origin: 'BOM',
            destination: 'DEL',
            departureTime: bomDelDep2,
            arrivalTime: bomDelArr2,
            durationMinutes: 140,
            price: 5000,
            availableSeats: {
                economy: 22,
                premium: 12,
                business: 4,
                first: 2
            }
        }
    ]);

    console.log('✅ Flights reseeded successfully (outbound + return)');
};
