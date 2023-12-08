import { Component, OnInit } from '@angular/core';
import { AthleteService } from '../services/athlete.service';
import { Emitters } from '../emitters/emitters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private athleteService: AthleteService,
    private router: Router
    ){}

  login = false;
  user = '';

  ngOnInit(): void {
    this.athleteService.authAthelte().subscribe({
      next: (res) => {
        this.login = true;
        this.user = res.data.name;
        Emitters.authEmitter.emit(true);
      },
      error: (err) => {
        this.login = false;
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/welcome'])
      }
    })
  }

}
