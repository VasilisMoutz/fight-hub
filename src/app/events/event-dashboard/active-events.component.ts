import { Component ,inject, OnInit } from '@angular/core';
import { FightEventsService } from '../../services/event.service';
import { FightEvent } from '../../interface/event-interfaces/fight-event';
import { ArrayResponse } from '../../interface/response-interfaces/arrayResponse';
import { AthleteService } from 'src/app/services/athlete.service';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-active-events',
  templateUrl: './active-events.component.html',
  styleUrls: ['./active-events.component.css']
})
export class ActiveEventsComponent implements OnInit{

  // for data fetching
  response: ArrayResponse;

  // storing and working with event data
  eventList: FightEvent[] = [];
  filteredEventList: FightEvent[] = [];

  // Inject Event service
  constructor(
    private eventService: FightEventsService,
    private athelteService: AthleteService,
    ){}

  
  ngOnInit(): void {

    // Fetch events
    this.eventService.getAllFightEvents().subscribe(
      (result: any) => {
        this.response = result
        // Store only active events
        this.eventList = this.response.data.filter(event => event.active === true)
        this.filteredEventList = this.eventList;
      }
    );

    // Emit authentication
    this.athelteService.authAthelte().subscribe(
      () => {
        Emitters.authEmitter.emit(true);
      }
    )
  }

  // Search Functionality
  filterResults(text: string) {
    if (!text) {
      // If not input show all events
      this.filteredEventList = this.eventList;
      return;
    }

    // Else filter 
    this.filteredEventList = this.eventList.filter(
      event => event.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
  }
}
