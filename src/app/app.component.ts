import { Component } from '@angular/core';
import { LoginService, AuthService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }
  
  isLogged: boolean;
  title = 'aTipper';

  isAuth() {
    return AuthService.isAuthenticated();
  }

/*  ngOnInit(): void {
    this.isLogged = AuthService.loggedIn;
  }

  ngOnChanges(): void {
    this.isLogged = AuthService.loggedIn;
  }*/

}
