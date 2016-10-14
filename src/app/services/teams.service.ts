// Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { TeamsModel } from '../models/teams';
import { AuthService } from '../services/login.service';

@Injectable()
export class TeamsService {

  constructor (
      private http: Http,
      private router: Router 
  ){}

  private TeamsUrl = 'http://atipper.moniholz.at/teams';

  // Create a new Account
  create(name: Object): Observable<TeamsModel> {
      let auth: string = AuthService.getAuth();
      let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
      headers.append( 'Authorization', auth );
      let options = new RequestOptions({ headers: headers });
      options.method = RequestMethod.Post;

      return this.http.post(this.TeamsUrl, JSON.stringify(name), options)
                      .map((res:Response) => {
                        if(res.status == 200){
                          res.json();
                        }
                      })
                      .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
      
      /*let xhr = new XMLHttpRequest();
      xhr.setRequestHeader('Authorization', auth);
      xhr.open('POST', this.TeamsUrl, true);
      xhr.withCredentials = true;
      xhr.send(name);*/
  }

}