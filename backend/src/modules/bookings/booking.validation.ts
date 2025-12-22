import { z } from 'zod';

export const createBookingSchema = z.object({
    body: z.object({
        flight: z.object({
            airline: z.string(),
            flightNumber: z.string(),
            origin: z.string(),
            destination: z.string(),
            departureTime: z.string(),
            arrivalTime: z.string(),
            price: z.number()
        }),
        contactEmail: z.string().email(),
        contactPhone: z.string(),
        passengers: z.array(
            z.object({
                name: z.string(),
                age: z.number(),
                gender: z.string(),
                seatPreference: z.string()
            })
        )
    })
});
