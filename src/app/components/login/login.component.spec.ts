import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let router: any;

  beforeEach(async () => {
   
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message for invalid Gmail address', () => {
    component.email = 'user@example.com';
    component.onSubmit();
    expect(component.errorMessage).toBe('Please provide a valid Gmail address.');
  });

  it('should navigate to dashboard on successful login', () => {
    const response = { jwtToken: '12345' };
    authServiceMock.login.and.returnValue(of(response));
    spyOn(router, 'navigate');

    component.email = 'user@gmail.com';
    component.password = 'password123';
    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith('user@gmail.com', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error', () => {
    authServiceMock.login.and.returnValue(throwError(() => new Error('Invalid credentials')));
    
    component.email = 'user@gmail.com';
    component.password = 'wrongpassword';
    component.onSubmit();

    expect(component.errorMessage).toBe('Invalid credentials. Please try again.');
  });

  it('should disable the sign in button when form is invalid', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });
});