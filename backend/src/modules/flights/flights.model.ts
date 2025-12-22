import { Schema, model } from 'mongoose';

const FlightSchema = new Schema(
    {
        flightNumber: { type: String, required: true },
        airline: { type: String, required: true },

        origin: { type: String, required: true },
        destination: { type: String, required: true },

        departureTime: { type: Date, required: true },
        arrivalTime: { type: Date, required: true },

        durationMinutes: { type: Number, required: true },

        price: { type: Number, required: true },

        availableSeats: {
            economy: { type: Number, required: true },
            premium: { type: Number, required: true },
            business: { type: Number, required: true },
            first: { type: Number, required: true }
        }
    },
    { timestamps: true }
);

export const FlightModel = model('Flight', FlightSchema);
