import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register-status',
  templateUrl: './register-status.component.html',
  styleUrls: ['./register-status.component.css']
})
export class RegisterStatusComponent implements OnInit{

  constructor(
    private route: ActivatedRoute
  ){}

  registerStatus: boolean;
  registerResponse: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.registerResponse = params['status'];
      if (this.registerResponse == 'true') {
        this.registerStatus = true;
      } else {
        this.registerStatus = false;
      }
    })
  }
}
