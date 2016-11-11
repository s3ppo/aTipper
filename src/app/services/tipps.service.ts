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
  private userid: string = LoginService.getUserId();

  // Get all Tipps
  getAll(): Observable<TippsModel[]> {
    let tippsUrl = this.TippsUrl + '?ts='+Date.now();
    let headers = new Headers({"Authorization": this.auth});
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });

    return this.http.get(tippsUrl, options)
                    .map((res:Response) => res.json()._items)
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Create a new Tipp
  create(name: TippsModel): Observable<TippsModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.auth);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.TippsUrl, name, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Get Single Tipp by matchid  --> not in use
  getbyMatch(matchid: string): Observable<TippsModel> {
    let tippUrl = this.TippsUrl + '?where={"matchid":"'+matchid+'"}';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.auth);
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get(tippUrl, options)
                    .map((res:Response) => res.json()._items[0])
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Change a Tipp
  change(object: TippsModel): Observable<TippsModel> {
    let tippUrl = this.TippsUrl + '/' + object['_id'];
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.auth);
    headers.append('If-Match', object['_etag']);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(tippUrl, options)
                    .map((res:Response) => res.json()._items[0])
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));

  }

}