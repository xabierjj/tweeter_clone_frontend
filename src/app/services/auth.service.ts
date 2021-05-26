import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';
import { addToken, removeToken } from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();

  private url: string = '/api'
  private token: string = ''
  constructor(private http: HttpClient, private store: Store) {

  }

  authenticate(user: any): Observable<any> {
    console.log(user)
    return this.http.post(`${this.url}/authenticate`, user)
  }
  refreshToken(): Observable<Object> {

    return this.http.get(`${this.url}/refreshtoken`)
  }

  logout() {
    return this.http.get(`${this.url}/logout`)


  }
  isAuthenticated(): boolean {
    const token = this.store.selectSnapshot<string>(AuthState.getToken)

    if (token == null) {
      return false
    } else {
     return true
    }
  }
  saveToken(token: string): void {
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken)

    this.store.dispatch( new addToken( {token:token, username: decodedToken.sub}))
   

   
  }


}
