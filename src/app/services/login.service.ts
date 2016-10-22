// Imports
import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LoginModel } from '../models/login';

@Injectable()
export abstract class AuthService {

  static admin: boolean = false;
  static auth: string;
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
    AuthService.auth = localStorage.getItem('Authorization');
    AuthService.admin = !!localStorage.getItem('Admin');
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
                        localStorage.setItem('Authorization', auth);
                        AuthService.auth = auth;
                        if(res.json().admin) {
                          localStorage.setItem('Admin', 'TRUE')
                          AuthService.admin = res.json().admin;
                        }
                        this.router.navigate(['/dashboard']);
                      }
                    })
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  logout(): any {
    AuthService.admin = false;
    AuthService.auth = "";
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Admin');
    this.router.navigate(['/login']);
  };

}