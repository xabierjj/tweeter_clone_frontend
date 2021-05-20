import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private router: Router) {

  }

  canActivate() {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token) {

      const decodedToken = this.helper.decodeToken(token);
      console.log(decodedToken)

      const role = decodedToken.roles.find((role) => {
        return role.authority == "ROLE_ADMIN"
      })

      if (role) {

        return true
      } else {
        this.router.navigateByUrl('home')

        return false
      }
    } else {
      this.router.navigateByUrl('login')

      return false

    }


  }

}
