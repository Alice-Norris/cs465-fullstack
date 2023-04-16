import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})

export class EditTripComponent implements OnInit {

  // image name to allow preview of image of the trip being edited
  imgName: string;
  // edit form
  editForm: FormGroup;
  // has the form been submitted? (Used for validation)
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
    ) { }

  ngOnInit() {
    // get trip code
    const tripCode = localStorage.getItem("tripCode");

    // handle missing trip code
    if (!tripCode) {
      alert("Something went wrong, couldn't find the tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('EditTripComponent#onInit found tripCode ' + tripCode);

  // represents the form in the HTML page for this component. Requires validation.
  this.editForm = this.formBuilder.group({
    _id: [],
    code: [tripCode, Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required]
  })

  console.log('EditTripComponent#onInit calling TripDataService#getTrip(\'' + tripCode + '\')');

  // get trip via trip service to autofill form/image
  this.tripService.getTrip(tripCode)
    .then(data => {
      console.log(data);
      this.editForm.patchValue(data[0]);
      this.imgName=data[0]["image"];
    })
  }

  // called when save button is clicked.
  onSubmit() {
    this.submitted = true;
    //if form is valid, update trip, redirect to trip listing page
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
      .then(data => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
  }

  get f() { return this.editForm.controls; }
}
