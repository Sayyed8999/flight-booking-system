import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SelectListComponent } from '../../../../shared/components/select-list/select-list';
import { cabinClassOptionList, tripTypeOptionList } from '../../../../shared/data/option-list-data';
import { DateInputComponent } from '../../../../shared/components/date-input/date-input';
import { NumberInputComponent } from '../../../../shared/components/number-input/number-input';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flights.service';
import { TripType } from '../../../../shared/utilities/enums/trip-type.enum';
import { SearchableSelectList } from '../../../../shared/components/searchable-select-list/searchable-select-list';
import { INDIAN_AIRPORTS } from '../../../../shared/data/indian-airports';
@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    SelectListComponent,
    DateInputComponent,
    NumberInputComponent,
    SearchableSelectList
  ],
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.scss'
})
export class FlightSearch {
  public searchForm: FormGroup;
  public cabinClassOptionList = cabinClassOptionList
  public tripTypeOptionList = tripTypeOptionList
  public airportsData = INDIAN_AIRPORTS

  public today = new Date();
  public minReturnDate?: Date = this.today;

  constructor(private fb: FormBuilder, private router: Router, private flightService: FlightService) {
    this.searchForm = this.fb.group({
      tripType: [TripType.ONE_WAY],
      from: ['', Validators.required],
      to: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: [{ value: '', disabled: true }],
      passengers: this.fb.group({
        adults: [1, [Validators.required, Validators.min(1)]],
        children: [0, [Validators.min(0)]],
        infants: [0, [Validators.min(0)]],
      }),
      cabinClass: ['economy', Validators.required]
    });

    this.handleTripTypeChanges();
  }

  public ngOnInit() {
    this.searchForm.get('departureDate')!
      .valueChanges
      .subscribe((date: Date | null) => {
        this.minReturnDate = date ?? this.today;

        const returnCtrl = this.searchForm.get('returnDate');
        if (returnCtrl?.value && date && returnCtrl.value < date) {
          returnCtrl.setValue(null);
        }
      });
  }

  private handleTripTypeChanges(): void {
    this.searchForm.get('tripType')!.valueChanges.subscribe(type => {
      const returnCtrl = this.searchForm.get('returnDate')!;

      if (type === TripType.ROUND_TRIP) {
        returnCtrl.enable();
        returnCtrl.setValidators(Validators.required);
      } else {
        returnCtrl.disable();
        returnCtrl.clearValidators();
        returnCtrl.setValue('');
      }

      returnCtrl.updateValueAndValidity();
    });
  }

  public submit(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const payload = this.searchForm.getRawValue();

    this.router.navigate(
      ['/flights/results'],
      { state: { searchPayload: payload } }
    );
  }
}
