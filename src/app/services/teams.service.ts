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
      private router: Router,
  ){}

  private TeamsUrl = 'http://atipper.moniholz.at/teams';
  private auth: string = AuthService.getAuth();

  // Create a new Team
  create(name: Object): Observable<TeamsModel> {
    return Observable.create(observer => {
        let formData: FormData = new FormData();
        let xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open('POST', this.TeamsUrl);
        xhr.setRequestHeader('Authorization', this.auth);
        //xhr.setRequestHeader("Content-Type", "multipart/form-data");
        formData.append("teamname", name['teamname']);
        formData.append("flag", name['flag'], name['flag']['name']);

        xhr.send(formData);
    })
  }

  // Get all existing Teams
  getAll(): Observable<TeamsModel[]> {
    let headers = new Headers({"Authorization": this.auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.TeamsUrl, options)
                    .map((res:Response) => res.json()._items)
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

}