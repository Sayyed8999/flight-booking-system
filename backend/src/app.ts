import express from 'express';
import cors from 'cors';
import flightsRoutes from './modules/flights/flights.routes';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import bookingRoutes from './modules/bookings/booking.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);


export default app;
