import { Injectable } from '@angular/core';
import { FightEvent } from '../interface/event-interfaces/fight-event';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ArrayResponse } from '../interface/response-interfaces/arrayResponse';
import { SingleResponse } from '../interface/response-interfaces/singleResponse';

@Injectable({
  providedIn: 'root'
})
export class FightEventsService {

  constructor(private http: HttpClient) { }

  private readonly eventUrl: string = ' https://fight-hub-5a75f6d0e989.herokuapp.com/api/events'

  // Fetch all Events
  getAllFightEvents(): Observable<any> {
    return this.http.get<any>(this.eventUrl).pipe(
      map(response => this.mapArrayResponse(response))
    );
  }

  // Fetch single event
  getFightEvent(id: string): Observable<any> {
    return this.http.get<any>(`${this.eventUrl}/${id}`).pipe(
      map(response => this.mapSingleResponse(response))
    );
  }

  
  private mapSingleResponse(response: SingleResponse): SingleResponse {
    return {
      status: response.status,
      data: <FightEvent>{
        id: response.data._id,
        name: response.data.name,
        organizer: response.data.organizer,
        date: response.data.date,
        photo: response.data.photo,
        category: response.data.category,
        location: {
          city: response.data.location.city,
          district: response.data.location.district
        },
        active: response.data.active
      }
    }
  }

  
  // Map Neccessary info
  private mapArrayResponse(response: ArrayResponse): ArrayResponse {
    return {
      status: response.status,
      data: response.data.map((event: any) => (<FightEvent>{
        id: event._id,
        name: event.name,
        organizer: event.organizer,
        date: event.date,
        photo: event.photo,
        category: event.category,
        location: {
          city: event.location.city,
          district: event.location.district
        },
        active: event.active
      }))
    }
  }
}
