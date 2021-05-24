import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { addToken } from 'src/app/store/auth.actions';
import { AuthState } from 'src/app/store/auth.state';
import { Select, Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private store: Store, private authService: AuthService) {

  }
  canActivate(): boolean  {
    console.log(this.auth.isAuthenticated())



     if (this.auth.isAuthenticated()) {
       return true;
     } else {
      this.router.navigateByUrl('login')
      return false
     }
  }

  // canActivate(): boolean {
  //   const token = this.store.selectSnapshot<String>(AuthState.getToken)
  //   console.log("Auth Guard")

  //   console.log(token)
  //   if (token == null) {
  //         return false;
  //       this.authService.refreshToken().subscribe((res) => {
  //         console.log(res)
  //         this.store.dispatch(new addToken(res['token']))
  //         return true;
  //       }, (err)=> {
  //         this.router.navigateByUrl('login')
  //         return false
  //       })

      

  //   } else {
      
  //     return true
  //   }

  // }




  
}
