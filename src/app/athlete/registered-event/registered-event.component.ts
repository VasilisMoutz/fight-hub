import { Component, Input } from '@angular/core';
import { FightEvent } from 'src/app/interface/event-interfaces/fight-event';

@Component({
  selector: 'app-registered-event',
  templateUrl: './registered-event.component.html',
  styleUrls: ['./registered-event.component.css']
})
export class RegisteredEventComponent {

  @Input() fightEvent!: FightEvent;
}
