import { Component } from '@angular/core';
import { LoginService, AuthService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private LoginService: LoginService
  ) {}
  
  isLogged: boolean;

  isAuth() {
    let isLogged: string = AuthService.getAuth();
    if(isLogged != "" && isLogged != undefined){
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    return AuthService.isAdmin();
  }

  logout() {
    this.LoginService.logout();
  }

}
