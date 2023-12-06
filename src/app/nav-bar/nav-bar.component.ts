import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { AthleteService } from '../services/athlete.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  authenticated = false;

  constructor(private athleteService: AthleteService) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    )
  }

  logout(): void {
    this.athleteService.logoutAthlete()
      .subscribe({
        next: () => this.authenticated = false,
        error: (err) => console.log(err)
      })
  }

}
