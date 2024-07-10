import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { ManagerRegisterComponent } from './components/manager-register/manager-register.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: PersonComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  { path: 'manager-login', component: ManagerLoginComponent },
  { path: 'manager-register', component: ManagerRegisterComponent },
  { path: 'restaurants/:id', component:RestaurantDetailComponent},
  { path: 'user/mybookings',component:UserBookingsComponent},
  { path:'**',component:NotFoundComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
