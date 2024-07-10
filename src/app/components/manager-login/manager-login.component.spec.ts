import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerLoginComponent } from './manager-login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('ManagerLoginComponent', () => {
  let component: ManagerLoginComponent;
  let fixture: ComponentFixture<ManagerLoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ ManagerLoginComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerLoginComponent);
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

  it('should submit login data and navigate on success', () => {
    const mockResponse = { token: '12345' };
    spyOn(router, 'navigate');
    spyOn(localStorage, 'setItem').and.callFake(() => {});

    component.email = 'manager@example.com';
    component.password = 'password';
    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/manager/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'manager@example.com', password: 'password' });
    req.flush(mockResponse);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', '12345');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle HTTP error on login failure', () => {
    spyOn(window, 'alert');

    component.email = 'manager@example.com';
    component.password = 'password';
    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/manager/login');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(window.alert).toHaveBeenCalledWith('Login failed');
  });

  it('should disable the sign in button when form is invalid', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });
});