import { Component } from '@angular/core';
import { inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as BookingActions from '../bookings/store/booking.actions';
import { selectMyBookings, selectBookingLoading } from '../bookings/store/booking.selectors';

@Component({
  standalone: true,
  selector: 'app-bookings',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss'
})
export class Bookings implements OnInit {
  private store = inject(Store);

  bookings$ = this.store.select(selectMyBookings);
  loading$ = this.store.select(selectBookingLoading);

  ngOnInit(): void {
    this.store.dispatch(BookingActions.loadMyBookings());
  }
}

