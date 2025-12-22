import { Component } from '@angular/core';
import { inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Router } from '@angular/router';
import { selectBookingLoading, selectMyBookings } from '../../store/booking.selectors';
import * as BookingActions from '../../store/booking.actions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-bookings',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss'
})
export class Bookings implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  bookings$ = this.store.select(selectMyBookings);
  loading$ = this.store.select(selectBookingLoading);

  public ngOnInit(): void {
    this.store.dispatch(BookingActions.loadMyBookings());
  }

  public navigateToFlights(): void {
    this.router.navigate(['/flights']);
  }

  public openBooking(_id: any): void {
    this.router.navigate(['/bookings', _id]);
  }
}

