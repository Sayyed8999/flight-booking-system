import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPassengers } from './booking-passengers';

describe('BookingPassengers', () => {
  let component: BookingPassengers;
  let fixture: ComponentFixture<BookingPassengers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPassengers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPassengers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
