import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit{
  userName: string

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.userName = await this.authService.getCurrentUser()['name'];
  }

  public listTrips(): void {
    this.router.navigate(['travel']);
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
