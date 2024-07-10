import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/bookings.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService,
    private reservationService: ReservationService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        console.log(this.bookings);
      },
      error: (err) => console.error(err),
      complete: () => console.log('Bookings fetched successfully.')
    });
  }
  cancelBooking(reservationId: number): void {
    this.reservationService.cancelReservation(reservationId).subscribe({
      next: (response) => {
        console.log('Cancellation successful', response);
        alert('Booking cancelled successfully!');
        
        // Find the booking in the bookings array and update its status
        const index = this.bookings.findIndex(booking => booking.reservation.id === reservationId);
        if (index !== -1) {
          this.bookings[index].reservation.status = 'CANCELLED'; // or 'PENDINGFORCANCELLATION' if applicable
        }
      },
      error: (error) => {
        console.error('Cancellation failed', error);
        alert('Failed to cancel the booking.');
      }
    });
    this.cdr.detectChanges();
  }
  getStatusColor(status: string): string {
    switch (status) {
      case 'CONFIRMED':
        return 'green';
      case 'REJECTED':
        return 'red';
      case 'PENDING':
        return 'orange';
      case 'CANCELLED':
        return 'grey';
      case 'PENDINGFORCANCELLATION':
          return 'grey';
      default:
        return 'transparent';
    }
  }
}