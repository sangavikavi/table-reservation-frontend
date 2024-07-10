import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [ FormsModule ]  
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input email to component property', () => {
    const input = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
    const testEmail = 'test@example.com';

    input.value = testEmail;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.email).toEqual(testEmail);
  });

  it('should call onSubscribe when the form is submitted', () => {
    spyOn(component, 'onSubscribe');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.onSubscribe).toHaveBeenCalled();
  });

  
});