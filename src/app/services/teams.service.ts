// Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { TeamsModel } from '../models/teams';
import { LoginService } from '../services/login.service';

@Injectable()
export class TeamsService {

  constructor (
      private http: Http,
      private router: Router,
  ){}

  private TeamsUrl = 'http://atipper.moniholz.at/teams';
  private auth: string = LoginService.getAuth();

  // Get all existing Teams
  getAll(): Observable<TeamsModel[]> {
    let headers = new Headers({"Authorization": this.auth});
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.TeamsUrl, options)
                    .map((res:Response) => res.json()._items)
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Create a new Team
  create(name: Object) {
      return Observable.fromPromise(new Promise<TeamsModel>((resolve, reject) => {
        let formData: FormData = new FormData();
        let xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open('POST', this.TeamsUrl);
        xhr.setRequestHeader('Authorization', this.auth);
        formData.append("teamname", name['teamname']);
        formData.append("flag", name['flag'], name['flag']['name']);
        formData.append("group", name['group']);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject(xhr.response)
                }
            }
        }

        xhr.send(formData);
    }));
  }

  // Delete existing Team
  delete(team: Object): Observable<TeamsModel> {
    let delUrl = this.TeamsUrl + '/' + team['_id'];
    let headers = new Headers({"Authorization": this.auth});
    headers.append("If-Match", team['_etag']);
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