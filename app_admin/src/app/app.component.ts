import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { TitleService } from './services/title.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TitleService]
})

export class AppComponent implements OnInit{
  //title: string = '';
  previousTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private authService: AuthenticationService,
    private titleService: TitleService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.titleService.updateTitle('Admin')
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getTitle(): string {
    return this.title.getTitle();
  }
}
