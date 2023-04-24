import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { DeleteTripComponent } from './delete-trip/delete-trip.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'add-trip',
    data: { title: 'Add Trip' },
    component: AddTripComponent,
  },
  {
    path: 'edit-trip',
    data: { title: 'Edit Trip'},
    component: EditTripComponent
  },
  {
    path: 'delete-trip',
    data: { title: 'Delete Trip'},
    component: DeleteTripComponent
  },
  {
    path: 'login',
    data: { title: 'Login'},
    component: LoginComponent
  },
  {
    path: 'travel',
    data: { title: 'Travel'},
    component: TripListingComponent
  },
  {
    path: 'admin',
    data: { title: 'Admin'},
    component: HomeComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
