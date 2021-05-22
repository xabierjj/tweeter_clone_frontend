import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "http://127.0.0.1:8080/admin"
  constructor(private http: HttpClient) {

  }

  getUsers(offset): Observable<any> {

    console.log("Llamadaaaa al server")
    return this.http.get(`${this.url}/users?offset=${offset}`)
  }
  saveUser(user) {
    return this.http.post(`${this.url}/user`, user)
  }

  removeUser(id) {
    return this.http.delete(`${this.url}/user?id=${id}`)
  }

  updateUser(user) {
    return this.http.put( `${this.url}/user`, user)
  }
}
