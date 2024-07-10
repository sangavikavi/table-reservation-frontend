import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { UserBookingsComponent } from '../user-bookings/user-bookings.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
          { path: 'login', component: LoginComponent },
          { path: 'user/mybookings', component: UserBookingsComponent }
        ])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logo with correct text', () => {
    const logo = fixture.debugElement.query(By.css('.logo')).nativeElement;
    expect(logo.textContent).toContain('Booking Bistro');
  });

  it('should have links with correct navigation paths', () => {
    const links = fixture.debugElement.queryAll(By.css('nav a'));
    expect(links[0].nativeElement.getAttribute('routerLink')).toBe('/user/mybookings');
    expect(links[1].nativeElement.getAttribute('routerLink')).toBe('/dashboard');
    expect(links[2].nativeElement.getAttribute('routerLink')).toBe('/login');
  });

  it('should remove token from localStorage on logout', () => {
    spyOn(localStorage, 'removeItem');
    component.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});


