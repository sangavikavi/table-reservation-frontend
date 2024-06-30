import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-manager-register',
  templateUrl: './manager-register.component.html',
  styleUrls: ['./manager-register.component.scss']
})
export class ManagerRegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';

  constructor(private router: Router, private http:HttpClient) { }

  onSubmit() {
   const registerData={
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber
    
   };
   this.http.post('http://localhost:8080/manager/register', registerData).subscribe((data: any) => {
      console.log('Registration successful');
      this.router.navigate(['/manager-login']);
    },
    (error:HttpErrorResponse)=>{
      console.log('Registration failed');
      alert('Registration failed');
    });
    
  }
}
