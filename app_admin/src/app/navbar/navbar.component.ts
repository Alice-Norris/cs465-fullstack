import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { TitleService } from '../services/title.service';
import { User } from '../models/user';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  userName: string
  title: string
  titleSub: Subscription

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private titleService: TitleService,
    private route: ActivatedRoute,
  ) {

  }

  async ngOnInit() {
    // subscribing to title changes
    this.titleSub = this.titleService.currentTitle$.subscribe(
      title => {
        this.title = title;
      }
    )
    // retrieving user's name
    this.userName = await this.authService.getCurrentUser()['name'];
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  private onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('#');
    return;
  }
}
