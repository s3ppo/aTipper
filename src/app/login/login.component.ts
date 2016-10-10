import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { LoginService } from '../services/login.service';
import { LoginModel } from '../models/login';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  constructor(
    private LoginService: LoginService,
    private router: Router
  ){}

  loginmodel = new LoginModel('','');
  error_msg = '';

  doLogin(): void {
    let commentOperation:Observable<LoginModel>;
    commentOperation = this.LoginService.get(this.loginmodel);
    commentOperation.subscribe(
                            carepersons => {
                                this.loginmodel = new LoginModel('', '');
                            }, 
                            err => {
                                this.error_msg = err;
                            });
  }

}
