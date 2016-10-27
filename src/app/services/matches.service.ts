// Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs';

import { MatchesModel } from '../models/matches';
import { LoginService } from '../services/login.service';

@Injectable()
export class MatchesService {

  constructor (
      private http: Http,
      private router: Router,
  ){}

  private MatchesUrl = 'http://atipper.moniholz.at/matches';
  private auth: string = LoginService.getAuth();

  // Get all existing Matches
  getAll(): Observable<MatchesModel[]> {
    let url = this.MatchesUrl + '?embedded={"team1":1,"team2":1,"category":1}';
    let headers = new Headers({"Authorization": this.auth});
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                    .map((res:Response) => res.json()._items)
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Create a new Match 
  create(name: Object) {
    let headers = new Headers({"Authorization": this.auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.MatchesUrl, name, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Delete existing Match
  delete(match: Object): Observable<MatchesModel> {
    let delUrl = this.MatchesUrl + '/' + match['_id'];
    let headers = new Headers({"Authorization": this.auth});
    headers.append("If-Match", match['_etag']);
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(delUrl, options)
                    .map((res:Response) => {
                        if(res.status == 204){
                            return [{ status: res.status, json: res }]
                        }
                    })
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

}