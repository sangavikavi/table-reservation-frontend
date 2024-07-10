import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PersonComponent } from './person/person.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { ManagerRegisterComponent } from './components/manager-register/manager-register.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { TableWidgetComponent } from './components/table-widget/table-widget.component';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { GmailValidatorDirective } from './gmail-validator.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';





@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ManagerLoginComponent,
    ManagerRegisterComponent,
    FooterComponent,
    HeaderComponent,
    RestaurantDetailComponent,
    TableWidgetComponent,
    BookingDialogComponent,
    UserBookingsComponent,
    GmailValidatorDirective,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
