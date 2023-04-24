import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})

export class DeleteTripComponent implements OnInit {

  imgPath: string = '..\\..\\assets\\images\\';
  // image name to allow preview of image of trip being deleted
  imgName: string = '';
  // deletion form
  deleteForm: FormGroup;
  // no need to track validation here, textboxes autofilled and disabled.

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private tripService: TripDataService,
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
    //console.log('DeleteTripComponent#onInit found tripCode ' + tripCode);

    // represents the form in the HTML page for this component. Text inputs
    // disabled, no validation needed
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

    //console.log('DeleteTripComponent#onInit calling TripDataService#getTrip(\'' + tripCode + '\')');

    // get trip via trip service to autofill form/image
    const trip = this.tripService.getTrip(tripCode)
      .then(data => {
        //console.log(data);
        this.deleteForm.patchValue(data[0]);
        this.imgName = data[0]["image"];
      })
  }

  // called when delete button is clicked.
  onSubmit() {
    // form validation not required (all fields disabled)
    this.tripService.deleteTrip(this.deleteForm.value)
    .then(data => {
      //console.log(data);
      this.router.navigate([''])
    });
  }
}
