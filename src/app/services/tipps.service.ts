// Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { TippsModel } from '../models/tipps';
import { LoginService } from '../services/login.service';

@Injectable()
export class TippsService {

  constructor (
      private http: Http,
      private router: Router 
  ){}

  private TippsUrl = 'http://atipper.moniholz.at/tipps';
  private auth: string = LoginService.getAuth();

  // Create a new Tipp
  create(name: Object): Observable<TippsModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.auth);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.TippsUrl, name, options)
                    .map((res:Response) => {
                      if(res.status == 200){
                        res.json();
                      }
                    })
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

}