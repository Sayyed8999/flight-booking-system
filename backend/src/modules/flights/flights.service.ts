import { FlightModel } from './flights.model';

export const searchFlights = async (params: any) => {
    const {
        from,
        to,
        departureDate,
        passengers,
        cabinClass
    } = params;

    const requiredSeats =
        passengers.adults + passengers.children;

    const start = new Date(departureDate);
    const end = new Date(departureDate);
    end.setHours(23, 59, 59);

    return FlightModel.find({
        origin: from,
        destination: to,
        cabinClass,
        availableSeats: { $gte: requiredSeats },
        departureTime: { $gte: start, $lte: end }
    }).lean();
};
