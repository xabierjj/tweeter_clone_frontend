import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { addToken } from 'src/app/store/auth.actions';
import { AuthState } from 'src/app/store/auth.state';
import { Select, Store } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators'
@Injectable({
    providedIn: 'root'
})
export class JwtGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router, private store: Store, private authService: AuthService) {

    }


    canActivate() {
        const token = this.store.selectSnapshot<String>(AuthState.getToken)
        console.log("Auth Guard")

        console.log(token)
        if (token == null) {
            return this.authService.refreshToken().pipe(map((res) => {
                if (res) {
                    this.store.dispatch(new addToken(res['token']))
                    return true;
                }
            }), catchError(() => {
               // this.router.navigateByUrl('login')
                return of(this.router.createUrlTree(['/login']))
             }) )
        }else {
            return true
        }

       

       

    }





}
