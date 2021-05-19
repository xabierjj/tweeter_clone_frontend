import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private url: string = 'http://127.0.0.1:8080/api/tweet'

  constructor(private http: HttpClient) {

  }

  getFeed(offset: number): Observable<any> {

    let token = localStorage.getItem("token")
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.url}/feed/${offset}`, {
      headers:headers
    })

  }

  makeTweet(content:string) {
    let token = localStorage.getItem("token")
    console.log(token)
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.url}`,{content},{
      headers:headers
    })
  }
}
