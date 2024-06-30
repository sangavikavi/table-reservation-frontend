// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Change this to your backend's base URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, { "email":email, "password": password });
  }

  register(fullName: string, email: string, password: string, phoneNumber: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, { fullName, email, password, phoneNumber });
  }

  loginManager(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/manager/login`, { "email":email, "password": password });
  }

  registerManager(fullName: string, email: string, password: string, phoneNumber: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/manager/register`, { fullName, email, password, phoneNumber });
  }
}

