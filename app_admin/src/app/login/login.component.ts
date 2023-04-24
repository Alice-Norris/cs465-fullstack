import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // form error to display
  public formError: string = '';

  // credentials json for validation/sending
  private credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() { }

  // shows errors if necessary, otherwise, attempts to authenticate.
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }

  // actually perform login
  private doLogin(): void {
    this.authService.login(this.credentials)
      .then(() => this.router.navigateByUrl('/travel'))
      .catch((message) => this.formError = message);
  }
}
