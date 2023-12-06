import { Component, Input, OnInit} from '@angular/core';
import { FightEvent } from '../../interface/event-interfaces/fight-event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent{

  @Input() fightEvent!: FightEvent;

}
