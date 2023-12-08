import { Component, OnInit } from '@angular/core';
import { AthleteService } from 'src/app/services/athlete.service';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{
  
  isLoggedIn: boolean = false;

  constructor(private athleteService: AthleteService){}
  ngOnInit(): void {
    // check if user already logged in
    this.athleteService.authAthelte()
    .subscribe(
      (result: any) => this.onLoggedIn()
    )
  }

  onLoggedIn(){
    Emitters.authEmitter.emit(true);
    this.isLoggedIn = true;
  }

}
