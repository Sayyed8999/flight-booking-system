import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';

import { selectIsAuthenticated } from './store/auth.selectors';
import { AuthModalService } from './auth-modal.service';

export const authGuard: CanActivateFn = () => {
    const store = inject(Store);
    const authModal = inject(AuthModalService);

    return store.select(selectIsAuthenticated).pipe(
        take(1),
        map(isLoggedIn => {
            if (!isLoggedIn) {
                authModal.openLogin();
                return false;
            }
            return true;
        })
    );
};
