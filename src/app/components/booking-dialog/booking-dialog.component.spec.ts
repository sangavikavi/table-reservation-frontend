import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BookingDialogComponent } from './booking-dialog.component';
import { ReservationService } from '../../services/reservation.service';
import { BookingService } from '../../services/bookings.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

describe('BookingDialogComponent', () => {
  let component: BookingDialogComponent;
  let fixture: ComponentFixture<BookingDialogComponent>;
  let reservationServiceMock: any;
  let bookingServiceMock: any;
  let matDialogRefMock: any;

  beforeEach(async () => {
    reservationServiceMock = jasmine.createSpyObj('ReservationService', ['bookTable']);
    bookingServiceMock = jasmine.createSpyObj('BookingService', ['getBookings']);
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      declarations: [ BookingDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { restaurantId: 1, table: { id: 3 }, availableTimes: ['10:00', '11:00', '12:00'] } },
        { provide: ReservationService, useValue: reservationServiceMock },
        { provide: BookingService, useValue: bookingServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load bookings on init', fakeAsync(() => {
    const mockBookings = [{reservation: {reservationDate: '2024-07-03', slotStartTime: '10:00:00'}}];
    bookingServiceMock.getBookings.and.returnValue(of(mockBookings));
    component.ngOnInit();
    tick();
    expect(bookingServiceMock.getBookings).toHaveBeenCalled();
    expect(component.book).toEqual(mockBookings);
  }));

  it('should load available times when date changes', fakeAsync(() => {
    const loadSpy = spyOn(component, 'loadAvailableTimes');
    component.selectedDate = new Date();
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input[matInput]')).nativeElement;
    input.dispatchEvent(new Event('dateChange'));
    tick();
    expect(loadSpy).toHaveBeenCalled();
  }));

  it('should handle successful booking', fakeAsync(() => {
    reservationServiceMock.bookTable.and.returnValue(of('Booking successful'));
    component.bookTable();
    tick();
    expect(reservationServiceMock.bookTable).toHaveBeenCalled();
    expect(component.bookingError).toBe('');
  }));

  it('should handle booking errors', fakeAsync(() => {
    const errorResponse = { error: 'Error booking table' };
    reservationServiceMock.bookTable.and.returnValue(of({ error: errorResponse }));
    component.bookTable();
    tick();
    expect(component.bookingError).toContain('Failed to book the table. Please try again.');
  }));

  it('should close the dialog on close', () => {
    component.onClose();
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });
});