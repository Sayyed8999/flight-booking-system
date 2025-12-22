import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

import { filter, take } from 'rxjs/operators';
import { selectAuthUser } from '../../../auth/store/auth.selectors';
import * as BookingActions from '../../store/booking.actions';
import { Passenger } from '../../store/booking.models';

@Component({
  standalone: true,
  selector: 'app-booking-passengers',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './booking-passengers.html',
  styleUrl: './booking-passengers.scss'
})
export class BookingPassengers implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);

  public allowNavigation = false;

  public form: FormGroup = this.fb.group({
    contactEmail: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    contactPhone: ['', Validators.required],
    passengers: this.fb.array([this.createPassenger()])
  });

  public ngOnInit(): void {
    this.store
      .select(selectAuthUser)
      .pipe(
        filter(user => !!user),
        take(1)
      )
      .subscribe(user => {
        this.form.patchValue({
          contactEmail: user!.email
        });
      });
  }

  public get passengers(): FormArray {
    return this.form.get('passengers') as FormArray;
  }

  public createPassenger() {
    return this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      seatPreference: ['NONE']
    });
  }

  public addPassenger(): void {
    this.passengers.push(this.createPassenger());
  }

  public removePassenger(index: number): void {
    if (this.passengers.length > 1) {
      this.passengers.removeAt(index);
    }
  }

  private mapPassengers(rawPassengers: any[]): Passenger[] {
    return rawPassengers.map(p => ({
      name: p.name!,
      age: Number(p.age),
      gender: p.gender!,
      seatPreference: p.seatPreference ?? 'NONE'
    }));
  }

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();

    this.store.dispatch(
      BookingActions.savePassengers({
        contactEmail: rawValue.contactEmail!,
        contactPhone: rawValue.contactPhone!,
        passengers: this.mapPassengers(rawValue.passengers)
      })
    );

    this.allowNavigation = true;
    this.router.navigate(['/bookings/confirm']);
  }
}
