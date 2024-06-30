import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.scss']
})
export class ManagerLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) { }

  onSubmit() {
    const loginData ={
      email: this.email,
      password: this.password
    }
    this.http.post('http://localhost:8080/manager/login', loginData).subscribe((data: any) => {
      console.log('Login successful');
      localStorage.setItem('token', data.token);
      this.router.navigate(['/dashboard']);
    },
    (error:HttpErrorResponse)=>{
      console.log('Login failed');
      alert('Login failed');
    });
  }
}
