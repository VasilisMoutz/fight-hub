import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Fight } from 'src/app/interface/athlete-interfaces/fight';
import { Record } from 'src/app/interface/athlete-interfaces/record';
import { FightEvent } from 'src/app/interface/event-interfaces/fight-event';
import { ArrayResponse } from 'src/app/interface/response-interfaces/arrayResponse';
import { SingleResponse } from 'src/app/interface/response-interfaces/singleResponse';
import { AthleteService } from 'src/app/services/athlete.service';
import { FightEventsService } from 'src/app/services/event.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit{
  constructor(
    private athleteService: AthleteService,
    private eventService: FightEventsService
  ) {}

  eventResponse: ArrayResponse;
  athleteResponse: SingleResponse;

  recordArray: Record[] = [];
  recordIsEmpty = false;

  ngOnInit(): void {

    // Fetch athlete data and event's data
    combineLatest([this.athleteService.authAthelte(), this.eventService.getAllFightEvents()])
      .subscribe(
        ([athlete, events]) => {
          // Use corresponding interfaces
          this.eventResponse = events;
          this.athleteResponse = athlete;

          // Use responses to create the athete's record
          this.handleData(athlete = this.athleteResponse, events = this.eventResponse)
        }
      )
  }

  private handleData(athlete: any, events: any) {

    // Access athlete's record
    let record = athlete.data.record;

    if (this.isObjectEmpty(record)) {
      this.recordIsEmpty = true;
      return;
    }

    
    // Itterate through record ( all past fights )
    for (const key in record) {

      // access each fight record
      const fight = record[key];
      let event = events.data.find((ev: any) => ev.id === fight.event)

      // Map neccessary info
      const fightResult: Record = {
        eventName: event.name,
        organizer: event.organizer,
        date: event.date,
        won: fight.won
      }

      // Store info
      this.recordArray.push(fightResult);
    }
  }

  isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
}
