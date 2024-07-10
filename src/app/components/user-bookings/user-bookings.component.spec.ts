import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBookingsComponent } from './user-bookings.component';
import { BookingService } from '../../services/bookings.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserBookingsComponent', () => {
  let component: UserBookingsComponent;
  let fixture: ComponentFixture<UserBookingsComponent>;
  let bookingService: jasmine.SpyObj<BookingService>;

  beforeEach(async () => {
    
    const bookingServiceMock = jasmine.createSpyObj('BookingService', ['getBookings']);
    bookingServiceMock.getBookings.and.returnValue(of([
      { reservation: { restaurant: { name: 'Test Restaurant' }, table: { tableNumber: '10' }, reservationDate: '2021-12-01', slotStartTime: '18:00', slotEndTime: '20:00', status: 'CONFIRMED' } }
    ]));

    await TestBed.configureTestingModule({
      declarations: [ UserBookingsComponent ],
      providers: [
        { provide: BookingService, useValue: bookingServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookingsComponent);
    component = fixture.componentInstance;
    bookingService = TestBed.inject(BookingService) as jasmine.SpyObj<BookingService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBookings on init and render bookings', () => {
    expect(bookingService.getBookings).toHaveBeenCalled();
    expect(component.bookings.length).toBeGreaterThan(0);
    const bookingElement = fixture.debugElement.query(By.css('.container'));
    expect(bookingElement).toBeTruthy();
  });

  it('should display the correct status color', () => {
    const statusButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(statusButton.style.backgroundColor).toBe('green');
  });

  it('should display a message when no bookings are available', () => {
    bookingService.getBookings.and.returnValue(of([])); 
    component.ngOnInit();
    fixture.detectChanges();
    const noBookingMessage = fixture.debugElement.query(By.css('.Not-available'));
    expect(noBookingMessage).toBeTruthy();
  });

  it('should correctly determine the color based on the booking status', () => {
    expect(component.getStatusColor('CONFIRMED')).toBe('green');
    expect(component.getStatusColor('REJECTED')).toBe('red');
    expect(component.getStatusColor('PENDING')).toBe('orange');
    expect(component.getStatusColor('CANCELLED')).toBe('grey');
    expect(component.getStatusColor('PENDINGFORCANCELLATION')).toBe('grey');
    expect(component.getStatusColor('UNKNOWN')).toBe('transparent');
  });

});