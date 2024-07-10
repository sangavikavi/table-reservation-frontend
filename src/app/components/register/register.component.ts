// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  errorMessage: string = '';  

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    
    if (!this.email.endsWith('@gmail.com')) {
      this.errorMessage = 'Please provide a valid Gmail address.';
      return; 
    }
    this.authService.register(this.fullName, this.email, this.password, this.phoneNumber).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Navigate to login page or directly to the dashboard
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        // Handle registration failure
      }
    );
  }
}
