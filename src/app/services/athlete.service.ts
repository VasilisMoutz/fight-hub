import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Athlete } from '../interface/athlete-interfaces/athlete';
import { SingleResponse } from '../interface/response-interfaces/singleResponse';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  constructor(private http: HttpClient) { }

  private readonly athleteUrl: string = api.url + 'api/athletes/'

  // Register new athlete
  registerNewAthlete(athlete: Athlete): Observable<any> {
    return this.http.post<Athlete>(this.athleteUrl + 'signup', athlete);
  }

  // Athlete Login
  loginAthlete(credentials: any): Observable<any> {
    return this.http.post<any>(this.athleteUrl + 'login', credentials, 
    {withCredentials: true});
  }

  // Check Authentication
  authAthelte(): Observable<any> {
    return this.http.get<any>(this.athleteUrl + 'auth', {withCredentials: true})
    .pipe(
      map(response => this.processResponse(response))
    );
  }

  // Logout
  logoutAthlete(): Observable<any> {
    return this.http.post(this.athleteUrl + 'logout', {}, {withCredentials: true})
  }

  // Register to a new event
  eventRegister(id: string): Observable<any> {
    return this.http.post(this.athleteUrl + 'event-register', {'id': id}, {withCredentials: true});
  }

  // Map Neccessary info
  private processResponse(response: SingleResponse): SingleResponse {

    return {
      status: response.status,
      data: (<Athlete>{
        email: response.data.email,
        password: '',
        name: response.data.name,
        surname: response.data.surname,
        gender: response.data.gender,
        style: response.data.style,
        weight: response.data.weight,
        record: {...response.data.record},
        comingFights: {...response.data.comingFights}
      })
    };
  }
}
