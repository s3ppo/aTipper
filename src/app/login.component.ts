import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { LoginService } from './login.service';
import { LoginModel } from './model/login';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  constructor(
    private LoginService: LoginService
  ){}

  loginmodel = new LoginModel('','');

  doLogin(): void {
    let commentOperation:Observable<LoginModel>;
    commentOperation = this.LoginService.get(this.loginmodel);
    commentOperation.subscribe(
                            carepersons => {
                                this.loginmodel = new LoginModel('', '');
                                //this.router.navigate(['/careperson']);
                            }, 
                            err => {
                                console.log(err);
                            });
  }

}
