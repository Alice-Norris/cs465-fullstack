import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TitleService } from '../services/title.service';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})

export class EditTripComponent implements OnInit {

  imgPath: string = '..\\..\\assets\\images\\';
  // image name to allow preview of image of the trip being edited
  imgName: string = '';
  // edit form
  editForm: FormGroup;
  // has the form been submitted? (Used for validation)
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private title: Title,
    private authService: AuthenticationService,
    private tripService: TripDataService,
    private titleService: TitleService
    ) { }

  ngOnInit() {
    this.title.setTitle('Edit Trip')
    this.titleService.updateTitle(this.title.getTitle());
    // retrieving stored tripCode
    const tripCode = localStorage.getItem("tripCode");
    // console.log(this.imgName==='');
    if (!tripCode) {
      alert("Something went wrong, couldn't find the tripCode!");
      this.router.navigate(['']);
      return;
    }
    // console.log('EditTripComponent#onInit found tripCode ' + tripCode);

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

  // console.log('EditTripComponent#onInit calling TripDataService#getTrip(\'' + tripCode + '\')');

  const trip = this.tripService.getTrip(tripCode)
    .then(data => {
      // console.log(data);
      this.editForm.patchValue(data[0]);
      this.imgName=data[0]["image"];
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
      .then(data => {
        // console.log(data);
        this.router.navigate(['']);
      });
    }
  }

  get f() { return this.editForm.controls; }
}
