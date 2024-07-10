import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableWidgetComponent } from './table-widget.component';
import { RestaurantService } from '../../services/restaurant.service';
import { TimeSlotService } from 'src/app/services/time-slot.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TableWidgetComponent', () => {
  let component: TableWidgetComponent;
  let fixture: ComponentFixture<TableWidgetComponent>;
  let restaurantService: jasmine.SpyObj<RestaurantService>;
  let timeSlotService: jasmine.SpyObj<TimeSlotService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    // Mock services and dialog
    const restaurantServiceMock = jasmine.createSpyObj('RestaurantService', ['getRestaurantById']);
    const timeSlotServiceMock = jasmine.createSpyObj('TimeSlotService', ['generateTimeSlots']);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    
    const restaurantData = {
      restaurant: { id: 1, workingDays: 'Mon-Fri' },
      tables: [{ tableNumber: '1', capacity: '4', tableType: 'VIP' }]
    };
    restaurantServiceMock.getRestaurantById.and.returnValue(of(restaurantData));
    timeSlotServiceMock.generateTimeSlots.and.returnValue(['12:00', '14:00']);

    const routeMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ TableWidgetComponent ],
      providers: [
        { provide: RestaurantService, useValue: restaurantServiceMock },
        { provide: TimeSlotService, useValue: timeSlotServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ],
      imports: [ NoopAnimationsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableWidgetComponent);
    component = fixture.componentInstance;
    restaurantService = TestBed.inject(RestaurantService) as jasmine.SpyObj<RestaurantService>;
    timeSlotService = TestBed.inject(TimeSlotService) as jasmine.SpyObj<TimeSlotService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch restaurant and table details based on route id', () => {
    expect(restaurantService.getRestaurantById).toHaveBeenCalledWith(1);
    expect(component.restaurant).toBeTruthy();
    expect(component.tables.length).toBeGreaterThan(0);
  });

  it('should display tables and handle no tables scenario', () => {
    const tablesElement = fixture.debugElement.query(By.css('.tables'));
    expect(tablesElement).toBeTruthy();
    
    restaurantService.getRestaurantById.and.returnValue(of({ restaurant: { id: 1 }, tables: [] }));
    component.ngOnInit();
    fixture.detectChanges();
    const noTablesMessage = fixture.debugElement.query(By.css('.noTables'));
    expect(noTablesMessage).toBeTruthy();
  });

  // it('should open booking dialog with correct data when Book Now is clicked', () => {
  //   const table = { tableNumber: '1', capacity: '4', tableType: 'VIP' };
  //   component.openBookingDialog(table);
  //   expect(dialog.open).toHaveBeenCalled();
  //   expect(dialog.open.calls.mostRecent().args[1].data.table).toBe(table);
  //   expect(dialog.open.calls.mostRecent().args[1].data.availableTimes).toEqual(['12:00', '14:00']);
  // });

  // Additional tests could include checking for the correct calculation and update of available times.
});