// Imports
import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { AdminMembersModel } from '../models/adminmembers';
import { AuthService } from './login.service';

@Injectable()
export class AdminMembersService {

  constructor (
      private http: Http,private router: Router
  ){}

  private AdminMembersUrl = 'http://atipper.moniholz.at/adminmembers';
  private auth = AuthService.getAuth();

  // Get Members
  getAll(): Observable<AdminMembersModel[]> {
    let adminmembersUrl = this.AdminMembersUrl + '?ts='+Date.now();
    let headers = new Headers({"Authorization": this.auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(adminmembersUrl, options)
                    .map((res:Response) => res.json()._items)
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Change Members
  change(object: Object, value: string): Observable<AdminMembersModel> {
    let changeUrl = this.AdminMembersUrl + '/' + object['_id'];
    let headers = new Headers({"Authorization": this.auth});
    headers.append('Content-Type', 'application/json');
    headers.append('If-Match', object['_etag']);
    let options = new RequestOptions({ headers: headers });
    let body: string;
    if(value == 'paid') {
      body = '{"'+value+'":'+object[value]+'}';
    } else if(value == 'roles') {
      body = '{"'+value+'":"'+object[value]+'"}';
    }

    return this.http.patch(changeUrl, body, options)
                    .map((res:Response) => res.json() )
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

}