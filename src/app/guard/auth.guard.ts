import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { addToken } from 'src/app/store/auth.actions';
import { AuthState } from 'src/app/store/auth.state';
import { Select, Store } from '@ngxs/store';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private auth: AuthService, private router: Router, private store: Store, private authService: AuthService) {

  }
  canActivate(): boolean  {
    const token = this.store.selectSnapshot<string>(AuthState.getToken)
    const decodedToken = this.helper.decodeToken(token);
    
  
     if (decodedToken) {
       return true;
     } else {
      //this.router.navigateByUrl('login')
      return false
     }
  }






  
}
