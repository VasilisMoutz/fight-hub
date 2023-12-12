import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ActiveEventsComponent } from './events/event-dashboard/active-events.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EventRegisterComponent } from './events/event-register/event-register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './athlete/profile/profile.component';
import { RecordComponent } from './athlete/record/record.component';
import { UpcomingComponent } from './athlete/upcoming/upcoming.component';
import { ProfileNavComponent } from './athlete/profile-nav/profile-nav.component';
import { RegisteredEventComponent } from './athlete/registered-event/registered-event.component';
import { CallToActionComponent } from './athlete/call-to-action/call-to-action.component';
import { RegisterStatusComponent } from './athlete/register-status/register-status.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ActiveEventsComponent,
    EventDetailsComponent,
    HomeComponent,
    PageNotFoundComponent,
    EventRegisterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RecordComponent,
    UpcomingComponent,
    ProfileNavComponent,
    RegisteredEventComponent,
    CallToActionComponent,
    RegisterStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
