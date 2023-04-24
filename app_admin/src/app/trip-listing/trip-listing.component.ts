import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { TitleService } from '../services/title.service';

import { Trip } from '../models/trip';


@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})

export class TripListingComponent implements OnInit {

  //trips: Array<any> = trips;
  trips: Trip[];
  viewModes: Array<string> = ['list', 'card'];
  mode: string = this.viewModes[0]
  message: string;
  headerText: string = this.title.getTitle();

  constructor(
    private tripDataService: TripDataService,
    private title: Title,
    private titleService: TitleService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  private addTrip(): void {
    //console.log('Inside TripListingComponent#addTrip');
    this.router.navigate(['add-trip']);
  }

  private changeViewMode(mode: string): void {
    //console.log("Mode received: " + mode);
  }

  private getTrips(): void {
    //console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService
      .getTrips()
        .then(foundTrips => {
          this.message = foundTrips.length > 0 ? '' : 'No trips found';
          this.trips = foundTrips;
        });
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.getTrips();
    this.route.data.subscribe((data) => {
      //console.log(data.title);
      this.title.setTitle('Travel');
      this.titleService.updateTitle(this.title.getTitle());
    })
  }
}
