import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { DeleteTripComponent } from './delete-trip/delete-trip.component';

const routes: Routes = [
  { path: 'add-trip', component: AddTripComponent }, // CREATE trip via POST
  { path: 'edit-trip', component: EditTripComponent }, // UPDATE trip via PUT
  { path: 'delete-trip', component: DeleteTripComponent }, // DELETE trip via DELETE
  { path: '', component: TripListingComponent, pathMatch: 'full' } // READ trips via GET
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
