// src/app/components/login/login.component.ts
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

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Save the token and navigate to the dashboard
        localStorage.setItem('token', response.jwtToken);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
        // Handle login failure
      }
    );
  }
}
