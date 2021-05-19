import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router:Router) {

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
  
}
