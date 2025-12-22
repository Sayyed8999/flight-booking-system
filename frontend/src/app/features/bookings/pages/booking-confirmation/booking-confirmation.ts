import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import * as BookingActions from '../../store/booking.actions';

import {
  selectSelectedFlight,
  selectPassengerDetails
} from '../../store/booking.selectors';

@Component({
  standalone: true,
  selector: 'app-booking-confirmation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.scss'
})
export class BookingConfirmation {
  private store = inject(Store);
  private router = inject(Router);

  vm$ = combineLatest({
    flight: this.store.select(selectSelectedFlight),
    passengerDetails: this.store.select(selectPassengerDetails)
  });

  confirmBooking() {
    this.store.dispatch(BookingActions.createBooking());
  }

  goBack() {
    this.router.navigate(['/bookings/new']);
  }
}
