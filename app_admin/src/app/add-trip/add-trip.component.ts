import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    let tripCode = localStorage.getItem("tripCode");
    if(!tripCode) {
      alert("Something went wrong, couldn't find trip code!");
      this.router.navigate(['']);
      return;
    }

    console.log('AddTripComponen#onInit found tripCode ' + tripCode);

    this.addForm = this.formBuilder.group({
      id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })
  console.log('EditTripComponent#onInit calling TripDataService#addTrip(\'' + tripCode + '\')');
  }
  
  onSubmit() {
    this.submitted = true;
    if(this.addForm.valid){
      this.tripService
      .addTrip(this.addForm.value)
      .then ( data => {
        console.log(data);
        this.router.navigate(['']);
      })
    }
  }

  get f() { return this.addForm.controls; }
}
