import { CanDeactivateFn } from '@angular/router';
import { BookingPassengers } from '../pages/booking-passengers/booking-passengers';

export const unsavedPassengersGuard: CanDeactivateFn<BookingPassengers> = (
    component
) => {
    if (component.form.dirty) {
        return confirm(
            'You have unsaved passenger details. Are you sure you want to leave?'
        );
    }

    return true;
};
