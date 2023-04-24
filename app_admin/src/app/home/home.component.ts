import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'
import { TitleService } from '../services/title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: ['app-home { height: 100%; }']
})

export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private titleService: TitleService,
    private title: Title,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.titleService.updateTitle(this.title.getTitle())
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
