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

  imgName: string;
  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
    ) { }

  ngOnInit() {
    const tripCode = localStorage.getItem("tripCode");

    if (!tripCode) {
      alert("Something went wrong, couldn't find the tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('EditTripComponent#onInit found tripCode ' + tripCode);

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

  this.tripService.getTrip(tripCode)
    .then(data => {
      console.log(data);
      this.editForm.patchValue(data[0]);
      this.imgName=data[0]["image"];
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
      .then(data => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
  }
}
