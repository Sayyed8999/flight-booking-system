import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { selectBooking } from '../../store/booking.selectors';
import { tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-booking-success',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.scss'
})
export class BookingSuccess {
  private store = inject(Store);
  private router = inject(Router);

  booking$ = this.store.select(selectBooking).pipe(
    tap(booking => {
      if (!booking) {
        this.router.navigate(['/flights']);
      }
    })
  );

  goToBookings() {
    this.router.navigate(['/bookings']);
  }

  bookAnother() {
    this.router.navigate(['/flights']);
  }
}
