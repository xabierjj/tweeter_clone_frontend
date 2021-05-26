import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { addToken } from 'src/app/store/auth.actions';
import { AuthState } from 'src/app/store/auth.state';
import { Select, Store } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators'
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class JwtGuard implements CanActivate {
    helper = new JwtHelperService();

    constructor(private auth: AuthService, private router: Router, private store: Store, private authService: AuthService) {

    }


    canActivate(): Observable<boolean> {
        const token = this.store.selectSnapshot<string>(AuthState.getToken)
        // console.log("Auth Guard")

        if (token==null) {
            return this.auth.refreshToken().pipe(
                map((response) => { 
                    console.log(response)

                 

                    this.authService.saveToken(response['token'])
                    return true 
                }),
                catchError((error) => { 
                    this.router.navigateByUrl('login')
                    return of(false) 
                }))
        } else {
            const decodedToken = this.helper.decodeToken(token);
            if (decodedToken) {
                return of(true) 

            } else {
                this.router.navigateByUrl('login')
                return of(false) 

            }
        }


    }





}
