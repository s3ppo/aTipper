// Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { CategoriesModel } from '../models/categories';
import { LoginService } from '../services/login.service';

@Injectable()
export class CategoriesService {

  constructor (
      private http: Http,
      private router: Router 
  ){}

  private CategoriesUrl = 'http://atipper.moniholz.at/categories';
  private auth: string = LoginService.getAuth();

  // Create a new Account
  create(name: Object): Observable<CategoriesModel> {
    let headers = new Headers({"Authorization": this.auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.CategoriesUrl, name, options)
                    .map((res:Response) => {
                      if(res.status == 200){
                        res.json();
                      }
                    })
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

}