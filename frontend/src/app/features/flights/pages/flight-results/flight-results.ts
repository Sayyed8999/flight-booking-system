import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Flight } from '../../models/flight.model';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { FlightService } from '../../services/flights.service';
import { map, Observable, startWith, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import * as BookingActions from '../../../bookings/store/booking.actions'
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FlightSearchResponse } from '../../models/flight-search-response.model';

@Component({
  selector: 'app-flight-results',
  standalone: true,
  imports: [CommonModule, MatCardModule, DurationPipe, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './flight-results.html',
  styleUrl: './flight-results.scss'
})
export class FlightResults implements OnInit {
  private flightService = inject(FlightService);
  private router = inject(Router);
  private store = inject(Store);

  results$!: Observable<FlightSearchResponse>;
  loading = true;

  ngOnInit(): void {

    const state = history.state as { searchPayload?: any };

    if (!state?.searchPayload) {
      this.router.navigate(['/flights']);
      return;
    }

    this.results$ = this.flightService
      .search(state.searchPayload)
      .pipe(
        tap(res => {
          if (!res.outboundFlights.length) {
            this.router.navigate(['/flights']);
          }
          this.loading = false;
        })
      );
  }


  selectFlight(flight: Flight): void {
    this.store.dispatch(BookingActions.selectFlight({ flight }));
  }
}
