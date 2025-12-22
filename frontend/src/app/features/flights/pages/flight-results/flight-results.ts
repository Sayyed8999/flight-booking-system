import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { FlightSearchResponse } from '../../models/flight-search-response.model';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { Flight } from '../../models/flight.model';
import { selectFlightResults, selectFlightsLoading } from '../../store/flights.selectors';
import * as FlightsActions from '../../store/flights.actions'
import * as BookingActions from '../../../bookings/store/booking.actions'

@Component({
  selector: 'app-flight-results',
  standalone: true,
  imports: [CommonModule, MatCardModule, DurationPipe, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './flight-results.html',
  styleUrl: './flight-results.scss'
})
export class FlightResults implements OnInit {
  private router = inject(Router);
  private store = inject(Store);

  public results$!: Observable<FlightSearchResponse | null>;
  public loading$!: Observable<boolean>;

  ngOnInit(): void {
    const state = history.state as { searchPayload?: any };

    if (!state?.searchPayload) {
      this.navigateToFlights();
      return;
    }

    this.store.dispatch(
      FlightsActions.searchFlights({
        payload: state.searchPayload
      })
    );

    this.results$ = this.store.select(selectFlightResults);
    this.loading$ = this.store.select(selectFlightsLoading);
  }


  public navigateToFlights(): void {
    this.router.navigate(['/flights']);
  }

  public selectFlight(flight: Flight): void {
    this.store.dispatch(BookingActions.selectFlight({ flight }));
  }
}
