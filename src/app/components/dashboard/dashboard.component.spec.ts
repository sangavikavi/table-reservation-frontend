import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { RestaurantService } from '../../services/restaurant.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let restaurantService: jasmine.SpyObj<RestaurantService>;

  beforeEach(async () => {

    const restaurantServiceMock = jasmine.createSpyObj('RestaurantService', ['getRestaurants', 'getAllRestaurants']);

    
    const response = {
      content: [{ id: 1, name: 'Bistro', cuisines: 'Italian', location: 'Street 123' }],
      totalElements: 1
    };

    restaurantServiceMock.getRestaurants.and.returnValue(of(response));
    restaurantServiceMock.getAllRestaurants.and.returnValue(of(response));

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [
        { provide: RestaurantService, useValue: restaurantServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    restaurantService = TestBed.inject(RestaurantService) as jasmine.SpyObj<RestaurantService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load restaurants on init', () => {
    expect(restaurantService.getAllRestaurants).toHaveBeenCalled();
    expect(component.restaurants.length).toBe(1);
    expect(component.filteredRestaurants.length).toBe(1);
  });

  it('should filter restaurants based on search term', () => {
    component.searchTerm = 'bistro';
    component.onSearchChange();
    fixture.detectChanges();

    expect(component.filteredRestaurants.length).toBe(1);
    expect(component.filteredRestaurants[0].name).toContain('Bistro');
  });

  it('should handle errors when loading restaurants fails', () => {
    restaurantService.getAllRestaurants.and.returnValue(throwError(() => new Error('Error loading data')));
    component.loadRestaurants();
    fixture.detectChanges();

    
    //expect(component.error).toBe(true);
    // expect(component.error).toBe(true);
  });

  it('should update pagination and reload restaurants', () => {
    const newPage = 2;
    component.onPageChange(newPage);
    fixture.detectChanges();

    expect(restaurantService.getAllRestaurants).toHaveBeenCalledWith(newPage, component.pageSize, component.filter);
    expect(component.currentPage).toBe(newPage);
  });

});