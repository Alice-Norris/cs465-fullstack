import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  // called when edit button is clicked
  private editTrip(trip: Trip): void {
    //refresh trip code, redirect to edit-trip
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }

  // called when delete button is clicked
  private deleteTrip(trip: Trip): void {
    //refresh trip code, redirect to delete-trip
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['delete-trip']);
  }

  //returns true if logged in, false if not
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
