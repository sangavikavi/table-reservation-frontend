import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantService } from '../../services/restaurant.service';
import { TimeSlotService } from 'src/app/services/time-slot.service';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'app-table-widget',
  templateUrl: './table-widget.component.html',
  styleUrls: ['./table-widget.component.scss']
})
export class TableWidgetComponent implements OnInit {

  
  restaurant: any;
  tables: any;
  availableTimes: string[] = [];
  id:any;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private timeSlotService: TimeSlotService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.restaurantService.getRestaurantById(id).subscribe(
      data => {
        this.restaurant = data.restaurant;
        this.tables = data.tables;
        console.log(this.tables);
        this.updateAvailableTimes();
      },
      error => {
        console.error('Error fetching restaurant details', error);
      }
    );
  }

  updateAvailableTimes(): void {
    if (this.tables && this.restaurant) {
      this.availableTimes = this.timeSlotService.generateTimeSlots(this.restaurant);
    }
  }

  openBookingDialog(table: any): void {
    const availableTimes = this.timeSlotService.generateTimeSlots(this.restaurant);
    this.dialog.open(BookingDialogComponent, {
      width: '450px',
      data: { table: table, availableTimes: availableTimes, restaurantId: this.restaurant.id } // Pass available times here
    });
  }
 
  
}