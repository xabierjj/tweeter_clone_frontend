import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "/api/user"
  constructor(private http: HttpClient) { }


  searchUser(term: string): Observable<any> {
    return this.http.get(`${this.url}/search?t=${term}`)
  }
}
