import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})

export class DeleteTripComponent implements OnInit {

  imgName: string;
  deleteForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
  ) { }

  ngOnInit() {
    const tripCode = localStorage.getItem("tripCode");

    if (!tripCode) {
      alert("Something went wrong, couldn't find the tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('DeleteTripComponent#onInit found tripCode ' + tripCode);

    this.deleteForm = this.formBuilder.group({
      _id: [],
      code: [{ value: tripCode, disabled: true}],
      name: [{ value: '', disabled: true}],
      length:  [{ value: '', disabled: true}],
      start:  [{ value: '', disabled: true}],
      resort:  [{ value: '', disabled: true}],
      perPerson:  [{ value: '', disabled: true}],
      image:  [{ value: '', disabled: true}],
      description: [{ value: '', disabled: true}],
    })

    console.log('DeleteTripComponent#onInit calling TripDataService#getTrip(\'' + tripCode + '\')');

    const trip = this.tripService.getTrip(tripCode)
      .then(data => {
        console.log(data);
        this.deleteForm.patchValue(data[0]);
        this.imgName = data[0]["image"];
      })
  }

  onSubmit() {
    this.submitted = true;

    this.tripService.deleteTrip(this.deleteForm.value)
    .then(data => {
      console.log(data);
      this.router.navigate([''])
    });
  }
}
