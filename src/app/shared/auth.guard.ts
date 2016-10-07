import { Injectable, Inject, Optional } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { AuthService } from "../login/login.service";

@Injectable()
export class AuthGuard implements CanActivate  {

  constructor() {
  }

  canActivate(): Observable<boolean> | boolean {
      let isLogged: boolean = AuthService.loggedIn;
      return isLogged;
  }

}