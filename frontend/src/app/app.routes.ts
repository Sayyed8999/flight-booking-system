import { Routes } from '@angular/router';
import { PageLayout } from './layout/components/page-layout/page-layout';
import { authGuard } from './features/auth/guards/auth.guard';
import { unsavedPassengersGuard } from './features/bookings/guards/unsaved-passengers.guard';

export const routes: Routes = [
    {
        path: '',
        component: PageLayout,
        children: [
            {
                path: 'flights',
                loadChildren: () =>
                    import('./features/flights/flights.routes')
                        .then(m => m.flightsRoutes)
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('./features/profile/profile').then(m => m.Profile),
                canActivate: [authGuard]
            },
            {
                path: 'bookings',
                loadComponent: () =>
                    import('./features/bookings/pages/my-bookings/bookings').then(m => m.Bookings),
                canActivate: [authGuard]
            },
            {
                path: 'bookings/new',
                canActivate: [authGuard],
                canDeactivate: [unsavedPassengersGuard],
                loadComponent: () =>
                    import('./features/bookings/pages/booking-passengers/booking-passengers')
                        .then(m => m.BookingPassengers)
            },
            {
                path: 'bookings/confirm',
                canActivate: [authGuard],
                loadComponent: () =>
                    import('./features/bookings/pages/booking-confirmation/booking-confirmation')
                        .then(m => m.BookingConfirmation)
            },
            {
                path: 'bookings/success',
                canActivate: [authGuard],
                loadComponent: () =>
                    import('./features/bookings/pages/booking-success/booking-success')
                        .then(m => m.BookingSuccess)
            },
            {
                path: 'bookings/:id',
                canActivate: [authGuard],
                loadComponent: () =>
                    import('./features/bookings/pages/my-bookings/booking-details/booking-details')
                        .then(m => m.BookingDetails)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'flights'
            },
            {
                path: '**',
                loadComponent: () =>
                    import('./shared/pages/not-found/not-found')
                        .then(m => m.NotFound)
            }
        ]
    }
];
