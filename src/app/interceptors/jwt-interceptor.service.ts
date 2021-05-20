import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {


  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    if (this.authService.isAuthenticated()) {
      const token=this.authService.getToken()
      const authReq = req.clone({ 
        headers:req.headers.set('Authorization',`Bearer ${token}`) ,
      });
      
      return next.handle(authReq)

    }
    console.log("Incerceptor")
    return next.handle(req)
  }
}
