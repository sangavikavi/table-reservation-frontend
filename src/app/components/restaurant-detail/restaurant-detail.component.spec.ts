import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantDetailComponent } from './restaurant-detail.component';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RestaurantDetailComponent', () => {
  let component: RestaurantDetailComponent;
  let fixture: ComponentFixture<RestaurantDetailComponent>;
  let restaurantService: jasmine.SpyObj<RestaurantService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    // Mock RestaurantService
    const restaurantServiceMock = jasmine.createSpyObj('RestaurantService', ['getRestaurantById']);
    const restaurantData = {
      restaurant: {
        id: 1,
        name: 'Test Restaurant',
        cuisines: 'Italian, French',
        location: '123 Test St, Test City',
        createdAt: '2021-01-01',
        updatedAt: '2021-06-01'
      }
    };
    restaurantServiceMock.getRestaurantById.and.returnValue(of(restaurantData));

    // Mock ActivatedRoute
    const routeMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ RestaurantDetailComponent ],
      providers: [
        { provide: RestaurantService, useValue: restaurantServiceMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantDetailComponent);
    component = fixture.componentInstance;
    restaurantService = TestBed.inject(RestaurantService) as jasmine.SpyObj<RestaurantService>;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch restaurant details based on route id', () => {
    expect(route.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(restaurantService.getRestaurantById).toHaveBeenCalledWith(1);
    expect(component.restaurant).toBeTruthy();
  });

  it('should display restaurant details correctly', () => {
    const nameElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(nameElement.textContent).toContain('Test Restaurant');

    const locationElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(locationElement.textContent).toContain('123 Test St, Test City');
  });

  it('should handle errors when fetching restaurant details fails', () => {
    restaurantService.getRestaurantById.and.returnValue(throwError(() => new Error('Error fetching data')));
    component.ngOnInit();
    fixture.detectChanges();

   
  });

});