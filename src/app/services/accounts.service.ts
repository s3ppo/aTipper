// Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { AccountsModel } from '../models/accounts';
import { AuthService } from '../login/login.service';

@Injectable()
export class AccountsService {

  constructor (
      private http: Http,
      private router: Router) 
  {}

  private LoginUrl = 'http://atipper.moniholz.at/accounts';

  // Create a new Account
  create(name: Object): Observable<AccountsModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.LoginUrl, name, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

}