import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Trip } from '../models/trip';

@Injectable()

export class TripDataService {
  constructor(private http: Http) { }

  // setting up url
  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  // adds one trip
  public addTrip(formData: Trip): Promise<Trip> {
    console.log('InsideTripDataService#addTrip');
    return this.http
      .post(this.tripUrl, formData )
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // gets one trip
  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Insiide TripDataService#getTrip(tripcode)');
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }

  // gets all trips
  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get(this.tripUrl)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  // edit one trip
  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put(this.tripUrl + formData.code, formData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError)
  }

  // delete one trip
  public deleteTrip(formData: Trip): Promise<Trip> {
    return this.http
      .delete(this.tripUrl + formData.code)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }

  // handles errors for any of the above requests.
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong: ', error);
    return Promise.reject(error.message || error);
  }

}
