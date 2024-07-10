import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/reservations/create'; 

  private baseUrl = 'http://localhost:8080/reservations';


  constructor(private http: HttpClient) { }

  bookTable(bookingDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, bookingDetails, { headers, responseType: 'text' });
  }

  cancelReservation(id: number): Observable<string> { // Note the Observable type is now string
    return this.http.post(`${this.baseUrl}/cancel/${id}`, {}, { responseType: 'text' });
  }
}