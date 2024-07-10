import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: any;
  let router: any;

  beforeEach(async () => {
    // Mock AuthService
    authServiceMock = jasmine.createSpyObj('AuthService', ['register']);
    
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.register on form submit', () => {
    const response = { success: true, message: "Registration successful" };
    authServiceMock.register.and.returnValue(of(response));
    spyOn(router, 'navigate');

    component.fullName = 'John Doe';
    component.email = 'john.doe@gmail.com';
    component.password = 'password123';
    component.phoneNumber = '1234567890';
    component.onSubmit();

    expect(authServiceMock.register).toHaveBeenCalledWith('John Doe', 'john.doe@gmail.com', 'password123', '1234567890');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle registration error', () => {
    const errorResponse = new Error('Registration failed');
    authServiceMock.register.and.returnValue(throwError(() => errorResponse));
    
    component.fullName = 'John Doe';
    component.email = 'john.doe@gmail.com';
    component.password = 'password123';
    component.phoneNumber = '1234567890';
    component.onSubmit();

  });

  it('should disable the sign up button when form is invalid', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });
});