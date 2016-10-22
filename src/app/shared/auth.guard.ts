import { Injectable, Inject, Optional } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { AuthService } from "../services/login.service";

@Injectable()
export class AuthGuard implements CanActivate  {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
      let isLogged: string = AuthService.getAuth();
      if(isLogged != "" && isLogged != undefined){
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

}