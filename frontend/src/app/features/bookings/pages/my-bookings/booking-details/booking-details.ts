import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import * as BookingActions from '../../../store/booking.actions';
import { selectSelectedBooking } from '../../../store/booking.selectors';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-booking-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './booking-details.html',
  styleUrl: './booking-details.scss'
})
export class BookingDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private router = inject(Router);
  private dialog = inject(MatDialog);


  booking$ = this.store.select(selectSelectedBooking);

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');

    if (!bookingId) {
      this.router.navigate(['/bookings']);
      return;
    }

    this.store.dispatch(
      BookingActions.loadBookingById({ bookingId })
    );
  }

  public navigateToBookings(): void {
    this.router.navigate(['/bookings']);
  }


  public cancelBooking(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to cancel this booking? This action cannot be undone.',
        primaryButton: 'Yes, Cancel',
        secondaryButton: 'No',
        variant: 'error'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(
          BookingActions.cancelBooking({ bookingId: id })
        );
      }
    });
  }

}
