import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private store: Store, ) {


  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.store.selectSnapshot<string>(AuthState.getToken)
    console.log("INTERCEPTORRRRR")
    console.log(token)
 
    if (token!=null) {
      const authReq = req.clone({ 
        headers:req.headers.set('Authorization',`Bearer ${token}`) ,
      });
      
      return next.handle(authReq)

    }

    return next.handle(req)
  }
}
