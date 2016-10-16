import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AccountsService } from '../services/accounts.service';
import { AccountsModel } from '../models/accounts';

@Component({
  selector: 'Register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: []
})
export class RegisterComponent {

  constructor(
    private AccountsService: AccountsService,
  ){}
  
  register_msg = '';
  registermodel = new AccountsModel('','','','','','','');

  doRegister(): void {
    if(this.registermodel.password == this.registermodel.password2){
      delete this.registermodel.password2;
    }

    let registerOperation:Observable<AccountsModel>;
    registerOperation = this.AccountsService.create(this.registermodel);
    registerOperation.subscribe(
                            register => {
                                this.registermodel = new AccountsModel('','','','','','','');
                            }, 
                            err => {
                                this.register_msg = err;
                            });
  }

}