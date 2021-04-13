import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { varConstants } from '../helpers/variable.constants';
import { CommonService } from '../services/common.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  className = AuthGuard.name;
  constructor(private router: Router, private common_service: CommonService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(route: Router): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthorization();
  }


  checkAuthorization() {
    let isValidUser: boolean = false;
    if (sessionStorage.getItem("is_logged_in") == null || sessionStorage.getItem("is_logged_in") == '0') {
      this.router.navigate(['/auth/login']);
      isValidUser = false;
    } else {
      isValidUser = true;
    }
    this.common_service.PrintLogs(varConstants.INFO, this.className, this.checkAuthorization.name, "isValidUser :", isValidUser);
    return isValidUser;
  }
}
