// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LoginModel } from './model/login';

@Injectable()
export class LoginService {

  constructor (private http: Http) {}

  private LoginUrl = 'http://atipper.moniholz.at/accounts';

  // Get CarePerson
  get(name: Object): Observable<LoginModel> { 
    let auth = "Basic " + btoa(name['username'] + ":" + name['password']);
    let headers = new Headers({"Authorization": auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.LoginUrl, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Create a new CarePerson
  create(name: Object): Observable<LoginModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.LoginUrl, name, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}