// Imports
import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LoginModel } from '../models/login';

@Injectable()
export abstract class AuthService {

  static loggedIn: boolean = false;
  static auth: string;
  static isAuthenticated(): boolean {
    return AuthService.loggedIn;
  }
  static getAuth(): string {
    return AuthService.auth;
  }

}

@Injectable()
export class LoginService extends AuthService {

  constructor (private http: Http,private router: Router) {
    super();
  }

  private LoginUrl = 'http://atipper.moniholz.at/';

  // Get Login
  get(name: Object): Observable<LoginModel> { 
    let auth = "Basic " + btoa(name['username'] + ":" + name['password']);
    let headers = new Headers({"Authorization": auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.LoginUrl, options)
                    .map((res:Response) => {
                      if(res.status == 200){
                        AuthService.loggedIn = true;
                        AuthService.auth = auth;
                        this.router.navigate(['/dashboard']);
                      }
                    })
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  logout(): any {
    AuthService.loggedIn = false;
    this.router.navigate(['/login']);
  };

}