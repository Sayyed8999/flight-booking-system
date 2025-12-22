import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../store/booking.models';

@Injectable({ providedIn: 'root' })
export class BookingApiService {
    private http = inject(HttpClient);

    createBooking(payload: any) {
        return this.http.post<{
            success: boolean;
            booking: Booking;
        }>('http://localhost:4000/api/bookings', payload);
    }

    getMyBookings() {
        return this.http.get<{
            success: boolean;
            bookings: Booking[];
        }>('http://localhost:4000/api/bookings/my');
    }

}
