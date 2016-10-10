// Imports
import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LoginModel } from '../models/login';

@Injectable()
export abstract class AuthService {

  static loggedIn: boolean = false;
  static admin: boolean = false;
  static auth: string;
  static isAuthenticated(): boolean {
    return AuthService.loggedIn;
  }
  static getAuth(): string {
    return AuthService.auth;
  }
  static isAdmin(): boolean {
    return AuthService.admin;
  }

}

@Injectable()
export class LoginService extends AuthService {

  constructor (private http: Http,private router: Router) {
    super();
  }

  private LoginUrl = 'http://atipper.moniholz.at/accounts';

  // Get Login
  get(name: Object): Observable<LoginModel> {
    let loginurl = this.LoginUrl+'/'+name['username']+'/';
    let auth = "Basic " + btoa(name['username'] + ":" + name['password']);
    let headers = new Headers({"Authorization": auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(loginurl, options)
                    .map((res:Response) => {
                      if(res.status == 200){
                        AuthService.loggedIn = true;
                        AuthService.auth = auth;
                        if(res.json().admin) {
                          AuthService.admin = res.json().admin;
                        }
                        this.router.navigate(['/dashboard']);
                      }
                    })
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  logout(): any {
    AuthService.loggedIn = false;
    AuthService.admin = false;
    this.router.navigate(['/login']);
  };

}