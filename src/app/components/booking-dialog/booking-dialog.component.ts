import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from '../../services/reservation.service';
import { BookingService } from '../../services/bookings.service';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit {
  availableTimes: { time: string, available: boolean }[] = [];
  selectedDate: Date = new Date();
  selectedTime: string = '';
  bookingError: string = '';
  minDate = new Date();
  book: any;

  constructor(
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService,
    private reservationService: ReservationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('restaurantId', this.data);
    console.log('restauratId', this.data.restaurantId);
    console.log('tableId', this.data.table.id);
    this.loadAvailableTimes();
    this.bookingService.getBookings().subscribe(bookings => {
      this.book = bookings;
    });
    console.log('bookings');
    console.log(this.book);
  }

  loadAvailableTimes() {
    console.log('Loading available times for:', this.selectedDate.toISOString());
    if (!this.selectedDate) {
      this.availableTimes = [];
      return;
    }
    this.bookingService.getBookings().subscribe(bookings => {
      console.log(bookings);
      this.filterAvailableTimeSlots(bookings, this.selectedDate);
      this.cdr.detectChanges();
    });
  }
  formatTime(timeWithSeconds: any) {
    return timeWithSeconds.slice(0, 5); // This slices the string to only include the first 5 characters, e.g., '10:00:00' becomes '10:00'
  }

  filterAvailableTimeSlots(bookings: any[], selectedDate: Date) {
    const day = selectedDate.toISOString().split('T')[0];

    //const day = "2024-07-03";
    console.log('Selected day for filtering:', day);
    // Assuming 'data' is accessible and contains 'availableTimes' as shown in your JSON format
    const allSlots = this.data.availableTimes;
    console.log('All possible slots:', allSlots);

    const bookedTimes = bookings.filter(booking =>
      booking.reservation.reservationDate === day
    ).map(booking => booking.reservation.slotStartTime.slice(0, 5));
    console.log('Booked times on selected day:', bookedTimes);

    // Generating the list of available times by checking against booked times
    this.availableTimes = allSlots.map((slot: string) => {
      return {
        time: slot,
        available: !bookedTimes.includes(slot)
      };
    })

    // Trigger change detection to update the view
    this.cdr.detectChanges();



  }


  generateAllTimeSlots(startTime: string, endTime: string): string[] {
    let startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
    let times = [];

    while (startHour < endHour) {
      times.push(`${startHour}:00`);
      startHour++;
    }
    return times;
  }

  selectTime(time: string): void {
    if (this.availableTimes.some(slot => slot.time === time && slot.available)) {
      this.selectedTime = time;
      // console.log(this.selectedTime)

    } else {
      console.log("This time slot is not available.");
    }
  }

  bookTable(): void {
   
    // let selectedTime = new Date(`1970-01-01T${this.selectedTime}`);
  
    const bookingDetails = {
      restaurantId: this.data.restaurantId,
      tableId: this.data.table.id,
      requestDate: this.selectedDate.toISOString().split('T')[0],
      slotStartTime: this.selectedTime+":00",
      slotEndTime: this.calculateEndTime(this.selectedTime),
      numberOfGuests: 4

      // "restaurantId": 1,
      // "tableId": 3,
      // "requestDate": "2024-07-05",
      // "slotStartTime": "11:00:00",
      // "slotEndTime": "12:00:00",
      // "numberOfGuests": 4
    };
    console.log(bookingDetails);

    this.reservationService.bookTable(bookingDetails).subscribe({
      next: (response) => {
        console.log('Booking successful', response);
        alert("Booked successfully");
        this.bookingError = '';
        for (let key in this.availableTimes) {
          if (this.availableTimes[key].time === this.selectedTime) {
            this.availableTimes[key].available = false;
          }}
        console.log(this.availableTimes)
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Booking failed', error);

        this.bookingError = error.error || 'Failed to book the table. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }

  calculateEndTime(startTime: string): string {
    const endTime = new Date(`1970-01-01T${startTime}`);
    endTime.setHours(endTime.getHours() + 2);
    return endTime.toISOString().split('T')[1].slice(0, 8); // format as HH:MM:SS
  }

  onClose(): void {
    this.dialogRef.close();
  }
}