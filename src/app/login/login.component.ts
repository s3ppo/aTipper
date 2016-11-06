import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { LoginService } from '../services/login.service';
import { LoginModel } from '../models/login';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MdSnackBar]
})
export class LoginComponent {

  constructor(
    private LoginService: LoginService,
    private router: Router,
    private snackBar: MdSnackBar,
    private viewContainerRef: ViewContainerRef
  ){}

  loginmodel = new LoginModel('','');

  doLogin(): void {
    let LoginOperation:Observable<LoginModel>;
    LoginOperation = this.LoginService.get(this.loginmodel);
    LoginOperation.subscribe(
                            login => { this.loginmodel = new LoginModel('', ''); }, 
                            err   => { let config = new MdSnackBarConfig(this.viewContainerRef);
                                       this.snackBar.open(err, 'Close', config); });
  }

}
