import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})

export class TripListingComponent implements OnInit {

  trips: Trip[]; // trip array to be fetched from db
  message: string; // message to be displayed to user

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) { }

  // adds a trip, called  when "Add Trip" is clicked on the page
  private addTrip(): void {
    console.log('Inside TripListingComponent#addTrip');
    this.router.navigate(['add-trip']);
  }

  // gets all trips, gets trip data for trip cards.
  private getTrips(): void {
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService
      .getTrips()
        .then(foundTrips => {
          // return no message if length >0, else 'no trips found'.
          this.message = foundTrips.length > 0 ? '' : 'No trips found';
          // setting trips so it can be rendered by Angular in html
          this.trips = foundTrips;
        });
  }

  ngOnInit(): void {
    this.getTrips();
  }
}
