import { Schema, model } from 'mongoose';

const PassengerSchema = new Schema({
    name: String,
    age: Number,
    gender: String,
    seatPreference: String,
    seatNumber: String
});

const BookingSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bookingRef: { type: String, required: true, unique: true },

        flight: {
            airline: String,
            flightNumber: String,
            origin: String,
            destination: String,
            departureTime: String,
            arrivalTime: String,
            price: Number
        },

        contactEmail: String,
        contactPhone: String,

        passengers: [PassengerSchema],

        status: {
            type: String,
            enum: ['CONFIRMED', 'CANCELLED'],
            default: 'CONFIRMED'
        }
    },
    { timestamps: true }
);

export const BookingModel = model('Booking', BookingSchema);
