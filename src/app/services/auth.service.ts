// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; 


  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/login`,{ "email":email, "password": password })
      .pipe(
        map(response => {
          localStorage.setItem('token', response.jwtToken);
          return response;
        }),
        catchError(this.handleError<any>('login', []))
      );
  }

  register(fullName: string, email: string, password: string, phoneNumber: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, { fullName, email, password, phoneNumber });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  loginManager(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/manager/login`, { "email":email, "password": password });
  }

  registerManager(fullName: string, email: string, password: string, phoneNumber: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/manager/register`, { fullName, email, password, phoneNumber });
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

