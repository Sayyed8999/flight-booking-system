import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { selectAuthLoading, selectAuthUser } from '../auth/store/auth.selectors';
import { AuthUser } from '../auth/store/auth.state';
import { FormInputComponent } from '../../shared/components/form-input/form-input';

import * as AuthActions from '../auth/store/auth.actions'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormInputComponent
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  public loading$: Observable<boolean>;

  public form!: FormGroup;
  public user!: AuthUser | null;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.loading$ = this.store.select(selectAuthLoading)
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [{ value: '', disabled: true }],
      role: [{ value: '', disabled: true }]
    });

    this.store.select(selectAuthUser).subscribe(user => {
      if (!user) return;

      this.user = user;

      this.form.patchValue({
        name: user.name,
        email: user.email,
        role: user.role
      });
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name } = this.form.getRawValue();

    this.store.dispatch(
      AuthActions.updateProfile({ name })
    );
  }
}
