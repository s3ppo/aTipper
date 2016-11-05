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
    let headers = new Headers({"Authorization": this.auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.AdminMembersUrl, options)
                    .map((res:Response) => res.json()._items)
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

}