import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AthleteService } from '../services/athlete.service';
import { Router } from '@angular/router';
import { passwordstrengthValidator } from '../validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewChecked{

  // For scrolling to error messages if they appear
  @ViewChild('scrollTarget', {static: false}) scrollTarget: ElementRef;

  form: FormGroup;
  formInvalid: boolean = false;
  loginError: boolean = false;
  submitClicked: boolean = false;

  constructor(
    private athleteService: AthleteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordstrengthValidator()])
    })
  }

  // Costantly be checking for changes
  ngAfterViewChecked(): void {
    /**
     * Scroll to client side error if
     *  - form has validation errors
     *  - scrollTarget (error element) has been instantiated
     *  - there is an attempt to submit
     */
    if (this.formInvalid && this.scrollTarget && this.submitClicked) {
      this.scroll();
      this.submitClicked = false; // <- wait for another submit
    }
    /**
     * Scroll to server side error if
     *  - form has validation errors
     *  - scrollTarget (error element) has been instantiated
     *  - there is an attempt to submit
     */
    if (this.loginError && this.scrollTarget && this.submitClicked) {
      this.scroll();
      this.submitClicked = false // <- Wait for another submit
    }
  }

  scroll() {
    // Access error div
    const element = this.scrollTarget.nativeElement;
    // Scroll to the error div
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  submit(): void {

    this.submitClicked = true;

    // Prevent Sending Invalid Form
    this.formInvalid = this.form.invalid;
    if (this.formInvalid) {
      return;
    }

    // If form is valid procceed with login
    this.athleteService.loginAthlete(this.form.getRawValue())
      .subscribe({
        // Successfull Login redirect to home
        next: () => this.router.navigate(['/home']),
        // Notify Server side error
        error: (error) => {
          this.loginError = true
          console.log(error);
        }
      });
  }
}

