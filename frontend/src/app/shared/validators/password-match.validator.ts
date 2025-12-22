import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
    group: AbstractControl
): ValidationErrors | null => {
    const passwordCtrl = group.get('password');
    const confirmCtrl = group.get('confirmPassword');

    if (!passwordCtrl || !confirmCtrl) {
        return null;
    }

    if (passwordCtrl.value !== confirmCtrl.value) {
        confirmCtrl.setErrors({
            ...confirmCtrl.errors,
            mismatch: true
        });
        return { passwordMismatch: true };
    }

    if (confirmCtrl.hasError('mismatch')) {
        const { mismatch, ...rest } = confirmCtrl.errors || {};
        confirmCtrl.setErrors(Object.keys(rest).length ? rest : null);
    }

    return null;
};
