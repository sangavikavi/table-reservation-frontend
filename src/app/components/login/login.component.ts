import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
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

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response && response.jwtToken) {
          console.log('Login successful', response);
          localStorage.setItem('token', response.jwtToken);
          this.router.navigate(['/dashboard']);
          this.errorMessage = ''; 
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }
}