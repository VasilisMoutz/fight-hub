import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Athlete } from 'src/app/interface/athlete-interfaces/athlete';
import { FightEvent } from 'src/app/interface/event-interfaces/fight-event';
import { AthleteService } from 'src/app/services/athlete.service';
import { FightEventsService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent implements OnInit{

  constructor(
    private eventService: FightEventsService,
    private athleteService: AthleteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // properties for fetching
  fightEventId = '';
  event: FightEvent;
  athlete: Athlete;

  // Cards for template
  eventCard = {
      photo: '',
      name: '',
      organizer: '',
      date: '',
      category: '',
      location: {
        city: '',
        district: ''
    }
  }

  athleteCard = {
    name: '',
    surname: '',
    gender: '',
    weightclass: ''
  }

  ngOnInit(): void {

    // Get clicked event Id 
    this.route.params.subscribe(params => {
      this.fightEventId = params['id'];
    })

    // Get event and athlete data
    forkJoin([
      this.athleteService.authAthelte(),
      this.eventService.getFightEvent(this.fightEventId)
    ]).subscribe(
      ([athlete, event]) => {
        this.athlete = athlete.data;
        this.event = event.data;
        this.createEventCard(this.event);
        this.createAthleteCard(this.athlete);
        console.log(this.eventCard, this.athleteCard)
      }
    )
  }

  createEventCard(event: any) {

    // deconstruct event
    const {
      photo,
      name,
      category,
      organizer,
      date,
      location 
    } = event;

    // Assign data to event card
    this.eventCard = {
      photo,
      name,
      category,
      organizer,
      date,
      location
    }
  }

  createAthleteCard(athlete: any) {
    // deconstruct athlete
    const {
      name,
      surname,
      gender,
      weight
    } = athlete;

    let weightclass = this.categoryCalc(weight);

    this.athleteCard = {
      name,
      surname,
      gender,
      weightclass
    }
  }

  // Calculate athelte division
  categoryCalc(weight: number): string {
    if (weight < 70) {
      return 'Lightweight';
    } else if (weight < 83){
      return 'Middleweight';
    } else {
      return 'Heavyweight';
    }
  }

  registerClicked() {

    this.athleteService.eventRegister(this.fightEventId)
    .subscribe({
      next: res => {
        this.router.navigate(['/register-status', 'true']);
      },
      error: err => {
        this.router.navigate(['/register-status', 'false']);
      },
  })
  }
}
