import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { FlightSearchPayload } from '../models/flight-search-payload';
import { FlightSearchResponse } from '../models/flight-search-response.model';
import { formatDate } from '../../../shared/utilities/date';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private readonly API = 'http://localhost:4000/api/flights';

  constructor(private http: HttpClient) { }

  public search(formValue: any) {
    const payload = this.mapToSearchPayload(formValue);

    return this.http.post<FlightSearchResponse>(
      `${this.API}/search`,
      payload
    );
  }

  private mapToSearchPayload(raw: any): FlightSearchPayload {
    return {
      origin: raw.from,
      destination: raw.to,
      departureDate: formatDate(raw.departureDate),
      returnDate: raw.returnDate ? formatDate(raw.returnDate) : null,
      tripType: raw.tripType,
      passengers: raw.passengers,
      cabinClass: raw.cabinClass
    };
  }
}