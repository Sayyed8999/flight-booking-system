import { Routes } from '@angular/router';
import { FlightSearch } from './pages/flight-search/flight-search';
import { FlightResults } from './pages/flight-results/flight-results';

export const flightsRoutes: Routes = [
    {
        path: '',
        component: FlightSearch
    },
    {
        path: 'results',
        component: FlightResults
    }
];
