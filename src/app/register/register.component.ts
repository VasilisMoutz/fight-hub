import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AthleteService } from '../services/athlete.service';
import { Athlete } from '../interface/athlete-interfaces/athlete';
import { Fight } from '../interface/athlete-interfaces/fight';
import { Router } from '@angular/router';
import { WeightValidator, fullNameValidator, passwordstrengthValidator } from '../validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewChecked{

  // For scrolling to error messages if they appear
  @ViewChild('scrollTarget', {static: false}) scrollTarget: ElementRef;

  form: FormGroup;
  formInvalid: boolean = false;
  registrationError: boolean = false;
  submitClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private athleteService: AthleteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, passwordstrengthValidator()]), 
      name: new FormControl('', [Validators.required, fullNameValidator()]),
      surname: new FormControl('',[Validators.required, fullNameValidator()]),
      gender: new FormControl('', Validators.required),
      weight: new FormControl(null, [Validators.required, WeightValidator()]),
      style: new FormControl('Brazilian Jiu Jitsu')
    });
  }


  // Costantly be checking for changes
  ngAfterViewChecked(): void {
    /**
     * Scroll to Client side error if
     *  - form has validation errors
     *  - scrollTarget (error element) has been instantiated
     *  - there is an attempt to submit
     */
    if (this.formInvalid && this.scrollTarget && this.submitClicked) {
      this.scroll();
      this.submitClicked = false;// <- wait for another submit
    }
    /**
     * Scroll to Server side error if
     *  - There is an error from the back-end
     *  - scrollTarget (error element) has been instantiated
     *  - there is an attempt to submit
     */
    if (this.registrationError && this.scrollTarget &&this.submitClicked) {
      this.scroll();
      this.submitClicked = false;// <- wait for another submit
    }
  }

  // Function to scroll to the element
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

    // If form is valid procceed with register
    const newAthlete: Athlete = this.form.value;
    this.athleteService.registerNewAthlete(newAthlete)
      .subscribe({
        // successfull signup redirect to login
        next: () => {this.router.navigate(['/login'])},
        // Notify Server side error
        error: (err) => {
          console.log(err);
          this.registrationError = true;
        }
      })
  }
}
