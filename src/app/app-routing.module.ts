import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActiveEventsComponent } from './events/event-dashboard/active-events.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './athlete/profile/profile.component';
import { canActivate } from './auth.guard';
import { RecordComponent } from './athlete/record/record.component';
import { UpcomingComponent } from './athlete/upcoming/upcoming.component';
import { EventRegisterComponent } from './events/event-register/event-register.component';
import { RegisterStatusComponent } from './athlete/register-status/register-status.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path: "explore", component: ActiveEventsComponent},
  {path: "details/:id", component: EventRegisterComponent, canActivate: [canActivate]},
  {path: "register-status/:status", component: RegisterStatusComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "profile", component: ProfileComponent, canActivate: [canActivate], children: [
    {path: '', redirectTo: 'record', pathMatch: 'full'},
    {path: "record", component: RecordComponent},
    {path: "fights", component: UpcomingComponent}
  ]},
  {path:"", redirectTo: 'home', pathMatch:'full'},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
