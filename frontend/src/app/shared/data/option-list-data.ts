import { TripType } from "../utilities/enums/trip-type.enum"

export const cabinClassOptionList = [
    { label: 'Economy', value: 'economy' },
    { label: 'Premium Economy', value: 'premium' },
    { label: 'Business', value: 'business' },
    { label: 'First', value: 'first' }
]

export const tripTypeOptionList = [
    { label: 'One-way', value: TripType.ONE_WAY },
    { label: 'Round-trip', value: TripType.ROUND_TRIP }
]