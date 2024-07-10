import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseUrl = 'http://localhost:8080/restaurants';

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.baseUrl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllRestaurants(page: number, size: number, filter: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('filter', filter); // Assuming the backend can handle a 'filter' query parameter

    return this.http.get<any>(this.baseUrl, { params });
  }
  getRestaurantById(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  getTablesByRestaurantId(restaurant:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/tables`);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    // TODO: Add better error handling
    throw error;
  }
}
