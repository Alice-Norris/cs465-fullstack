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
  lastSelection: string = '';
  timezone: string = '';
  locale: string = '';
  prevTitle: string = '';
  @Input('trips') trips: Trip[];

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthenticationService,
    private titleService: TitleService
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

  prevNav(): void {
    this.location.back();
  }
}
