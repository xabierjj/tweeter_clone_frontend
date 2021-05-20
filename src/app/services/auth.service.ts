import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://127.0.0.1:8080/api'
  private token:string=''
  constructor(private http:HttpClient) { 

  }

  authenticate(user:any): Observable<any>  {
    console.log(user)
    return this.http.post(`${this.url}/authenticate`, user)
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    
  }
  isAuthenticated() :boolean {
    const token = this.getToken()
    if (token) {
      return token.length>2
    } else {
      return false
    }
   }
    saveToken(token: string, username:string): void {
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(token);
      console.log(decodedToken)
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
   
    this.token = token;
  }

   getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    return this.token;
  }
}
