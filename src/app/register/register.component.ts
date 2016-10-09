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
    private router: Router
  ){}

  registermodel = new AccountsModel('','','','','','','');

  doRegister(): void {

  }

}