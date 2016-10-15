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

  // Create a new Account
  create(name: Object): Observable<TeamsModel> {
    return Observable.create(observer => {

        let formData: FormData = new FormData();
        let xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open('POST', this.TeamsUrl);

        let auth: string = AuthService.getAuth();
        xhr.setRequestHeader('Authorization', auth);
        //xhr.setRequestHeader("Content-Type", "multipart/form-data");

        formData.append("teamname", name['teamname']);
        formData.append("flag", name['flag'], name['flag']['name']);

        xhr.send(formData);

    })
  }

  

}