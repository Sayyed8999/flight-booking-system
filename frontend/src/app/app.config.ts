import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AUTH_FEATURE_KEY } from './features/auth/store/auth.state';
import { authReducer } from './features/auth/store/auth.reducer';
import { AuthEffects } from './features/auth/store/auth.effects';
import { authInterceptor } from './core/auth.interceptor';
import { BookingEffects } from './features/bookings/store/booking.effects';
import { BOOKING_FEATURE_KEY, bookingReducer } from './features/bookings/store/booking.reducer';
import { FlightsEffects } from './features/flights/store/flights.effects';
import { FLIGHTS_FEATURE_KEY, flightsReducer } from './features/flights/store/flights.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideStore({
      [AUTH_FEATURE_KEY]: authReducer,
      [BOOKING_FEATURE_KEY]: bookingReducer,
      [FLIGHTS_FEATURE_KEY]: flightsReducer
    }),
    provideEffects([AuthEffects, BookingEffects, FlightsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
};
