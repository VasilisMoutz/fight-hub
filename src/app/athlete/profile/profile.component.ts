import { Component, OnInit, inject } from '@angular/core';
import { Athlete } from 'src/app/interface/athlete-interfaces/athlete';
import { AthleteService } from 'src/app/services/athlete.service';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  athlete: Athlete;

  categories: string[] = ['Lightweight', 'Middleweight', 'HeavyWeight'];

  profileInfo = {
    name: '',
    style: '',
    totalFights: 0,
    winRate: '0',
    category: '',
    weight: 0,
    gender: ''
  }

  // Inject Athelte Service
  constructor(private athleteService: AthleteService){}

  ngOnInit(): void {
    this.athleteService.authAthelte().subscribe(
      (result: any) => {
        this.athlete = result.data;
        Emitters.authEmitter.emit(true);
        this.mapProfileInfo(result.data);
      }
    )
  }

  mapProfileInfo(athlete: any) {
    // weight
    this.profileInfo.weight = athlete.weight;
    // gender
    this.profileInfo.gender = athlete.gender;
    // athlete name
    this.profileInfo.name = athlete.name;
    // style
    this.profileInfo.style = athlete.style;
    // weight class
    this.categoryCalc(athlete.weight);
    // total Fights, win percentage
    this.fightsCalc(athlete.record);
  }

  // Calculate athelte division
  categoryCalc(weight: number) {
    if (weight < 70) {
      this.profileInfo.category = 'Lightweight';
    } else if (weight < 83){
      this.profileInfo.category = 'Middleweight';
    } else {
      this.profileInfo.category = 'Heavyweight';
    }
  }

  fightsCalc(fights: any){

    if(this.isObjectEmpty(fights)){
      return;
    }

    let totalWins = 0;
    let totalFights = 0;
    
   
    for (let key in fights)
    {
      // track total fights
      totalFights++;

       // track total wins
      let fight = fights[key];
      if (fight.won !== '') totalWins++;
    }

    this.profileInfo.totalFights = totalFights;

    this.profileInfo.winRate = ((totalWins / totalFights) * 100).toFixed(2);
  }

  isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
}
