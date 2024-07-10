import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerRegisterComponent } from './manager-register.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('ManagerRegisterComponent', () => {
  let component: ManagerRegisterComponent;
  let fixture: ComponentFixture<ManagerRegisterComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ ManagerRegisterComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerRegisterComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit registration data and navigate on success', () => {
    const mockResponse = { message: 'Registration successful' };
    spyOn(router, 'navigate');

    component.fullName = 'John Doe';
    component.email = 'john.doe@example.com';
    component.password = 'password123';
    component.phoneNumber = '1234567890';
    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/manager/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phoneNumber: '1234567890'
    });
    req.flush(mockResponse);

    expect(router.navigate).toHaveBeenCalledWith(['/manager-login']);
  });

  it('should handle HTTP error on registration failure', () => {
    spyOn(window, 'alert');

    component.fullName = 'John Doe';
    component.email = 'john.doe@example.com';
    component.password = 'password123';
    component.phoneNumber = '1234567890';
    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/manager/register');
    req.flush({}, { status: 400, statusText: 'Bad Request' });

    expect(window.alert).toHaveBeenCalledWith('Registration failed');
  });

  it('should disable the sign up button when form is invalid', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });
});