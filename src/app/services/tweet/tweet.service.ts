import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private url: string = '/api/tweet'

  constructor(private http: HttpClient) {

  }

  getFeed(offset: number): Observable<any> {

    return this.http.get(`${this.url}/feed/${offset}`)

  }

  makeTweet(content:string) {
    let token = localStorage.getItem("token")


    return this.http.post(`${this.url}`,{content})
  }
}
