import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-trip-table',
  templateUrl: './trip-table.component.html',
  styleUrls: ['./trip-table.component.css']
})

export class TripTableComponent implements OnInit {
  // holds code of last selected trip row
  lastSelection: string = '';

  // timezone and localization for parsing dates
  timezone: string = '';
  locale: string = '';

  // previous title for navigation links
  prevTitle: string = '';

  // receive list of trips as input
  @Input('trips') trips: Trip[];

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthenticationService, // login/register/authenticate
    private titleService: TitleService // updates/notifies of titles and title changes
  ) { }

  ngOnInit(): void {
    this.prevTitle = this.titleService.getPreviousTitle();
    // console.log(this.prevTitle);
  }

  // called when edit button is clicked
  private editTrip(trip: Trip): void {
    //refresh trip code, redirect to edit-trip
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }

  // navigates to previous page
  prevNav(): void {
    this.location.back();
  }
}
