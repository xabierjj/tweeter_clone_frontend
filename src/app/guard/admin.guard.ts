import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';
import { AuthService } from '../services/auth.service';
import { addToken } from '../store/auth.actions';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private router: Router, private store: Store, private auth: AuthService) {

  }

  canActivate() {






    const token = this.store.selectSnapshot<string>(AuthState.getToken)

    if (token == null) {
      return this.auth.refreshToken().pipe(
        map((response) => {
          console.log(response)

          let decodedToken = this.helper.decodeToken(response['token'])
          const role = decodedToken.roles.find((role) => {
            return role.authority == "ROLE_ADMIN"
          })

          if (role) {
            this.auth.saveToken(response['token'])

            return true
          } else {
            this.router.navigateByUrl('home')

            return false
          }

        }),
        catchError((error) => {
          this.router.navigateByUrl('home')
          return of(false)
        }))
    } else {
      const decodedToken = this.helper.decodeToken(token);
      if (decodedToken) {
        const role = decodedToken.roles.find((role) => {
          return role.authority == "ROLE_ADMIN"
        })

        if (role) {

          return of(true)
        } else {
          this.router.navigateByUrl('home')
          return of(false)
        }

      } else {
        this.router.navigateByUrl('login')
        return of(false)

      }
    }




  }

}
