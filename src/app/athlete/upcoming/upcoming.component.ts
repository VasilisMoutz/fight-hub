import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { FightEvent } from 'src/app/interface/event-interfaces/fight-event';
import { ArrayResponse } from 'src/app/interface/response-interfaces/arrayResponse';
import { SingleResponse } from 'src/app/interface/response-interfaces/singleResponse';
import { AthleteService } from 'src/app/services/athlete.service';
import { FightEventsService } from 'src/app/services/event.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit{

  constructor(
    private eventService: FightEventsService,
    private athleteService: AthleteService
  ){}

  // to store api responses
  athleteResponse: SingleResponse;
  eventResponse: ArrayResponse;

  // to store upcoming fights
  registeredFights: FightEvent[] = [];
  FightsIdArr: string[] = [];

  upcomingEmpty: boolean = false;


  ngOnInit(): void {
    // fetch athlete data //
    this.athleteService.authAthelte().subscribe(
      (athlete) => this.handleData(athlete)
    )
  }


  /**
   * Get access to the athlete upcoming fights
   * 
   * @param athete to get upcoming fights from
   */
  handleData(athete: any) {
    let comingFights = athete.data.comingFights;
    
    // check if there are fights to be shown
    if (this.isObjectEmpty(comingFights)) {
      this.upcomingEmpty = true;
      return;
    } 

    // store event id's
    for (const key in comingFights) {
      this.FightsIdArr.push(comingFights[key])
    }

    // fetch athlete upcoming events 
    this.fetchEventsData();

  }

  fetchEventsData(){
    // use event id's to fetch the specific event for each itteration
    for (let id in this.FightsIdArr){
      this.eventService.getFightEvent(this.FightsIdArr[id]).subscribe(
        (event) => {
          this.registeredFights.push(event.data);
        }
      )
    }
  }

  isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }

}
