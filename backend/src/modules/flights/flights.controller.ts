import { Request, Response } from 'express';
import { FlightModel } from './flights.model';
import { getDayRangeUTC } from '../../utils/date';

export const searchFlightsController = async (req: Request, res: Response) => {
    try {
        const {
            origin,
            destination,
            departureDate,
            returnDate,
            tripType,
            passengers,
            cabinClass
        } = req.body;

        const totalPassengers =
            passengers.adults +
            passengers.children +
            passengers.infants;

        const outboundRange = getDayRangeUTC(departureDate);
        if (!outboundRange) {
            return res.status(400).json({ message: 'Invalid departureDate' });
        }

        const outboundFlights = await FlightModel.find({
            origin: origin.toUpperCase(),
            destination: destination.toUpperCase(),
            departureTime: {
                $gte: outboundRange.start,
                $lte: outboundRange.end
            },
            [`availableSeats.${cabinClass}`]: { $gte: totalPassengers }
        });

        if (tripType === 'one-way') {
            return res.status(200).json({
                outboundFlights
            });
        }

        if (!returnDate) {
            return res.status(400).json({ message: 'returnDate is required for round-trip' });
        }

        const returnRange = getDayRangeUTC(returnDate);
        if (!returnRange) {
            return res.status(400).json({ message: 'Invalid returnDate' });
        }

        const returnFlights = await FlightModel.find({
            origin: destination.toUpperCase(),
            destination: origin.toUpperCase(),
            departureTime: {
                $gte: returnRange.start,
                $lte: returnRange.end
            },
            [`availableSeats.${cabinClass}`]: { $gte: totalPassengers }
        });

        return res.status(200).json({
            outboundFlights,
            returnFlights
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to search flights' });
    }
};
