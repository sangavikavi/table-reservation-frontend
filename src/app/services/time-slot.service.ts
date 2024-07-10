import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Table, Restaurant } from '../../models/restaurants.model';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  constructor() { }

  generateTimeSlots(restaurant: Restaurant): string[] {
    let slots: string[] = [];
    const openHour = parseInt(restaurant.openingTime.split(":")[0]);
    const closeHour = parseInt(restaurant.closingTime.split(":")[0]);

    for (let hour = openHour; hour < closeHour; hour++) {
      slots.push(`${hour}:00`);
      // Add more detailed time slots if needed, e.g., half-hour slots
      //slots.push(`${hour}:30`);
    }

    return slots;
  }
}
