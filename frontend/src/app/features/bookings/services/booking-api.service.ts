import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../store/booking.models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookingApiService {
    private baseUrl = `${environment.apiBaseUrl}/api/bookings`;

    private http = inject(HttpClient);

    createBooking(payload: any) {
        return this.http.post<{
            success: boolean;
            booking: Booking;
        }>(`${this.baseUrl}`, payload);
    }

    getMyBookings() {
        return this.http.get<{
            success: boolean;
            bookings: Booking[];
        }>(`${this.baseUrl}/my`);
    }

    getBookingById(bookingId: string) {
        return this.http.get<{
            success: boolean;
            booking: Booking;
        }>(`${this.baseUrl}/${bookingId}`);
    }

    cancelBooking(bookingId: string) {
        return this.http.patch<{
            success: boolean;
        }>(`${this.baseUrl}/${bookingId}/cancel`, {});
    }

}
