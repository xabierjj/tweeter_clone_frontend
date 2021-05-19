import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "http://127.0.0.1:8080/api/user"
  constructor(private http: HttpClient) { }


  searchUser(term: string): Observable<any> {

    let token = localStorage.getItem("token")
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.url}/search?t=${term}`,{
      headers:headers
    })
  }
}
