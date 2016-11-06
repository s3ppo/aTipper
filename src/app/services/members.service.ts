// Imports
import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { MembersModel } from '../models/members';
import { AuthService } from './login.service';

@Injectable()
export class MembersService {

  constructor (
      private http: Http,private router: Router
  ){}

  private MembersUrl = 'http://atipper.moniholz.at/members';
  private auth = AuthService.getAuth();

  // Get Members
  getAll(): Observable<MembersModel[]> {
    let membersUrl = this.MembersUrl + '?ts='+Date.now();
    let headers = new Headers({"Authorization": this.auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(membersUrl, options)
                    .map((res:Response) => res.json()._items)
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

}