import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/services/tweet/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls : ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tweets:any
  offset:number=0
  username:string=''
  constructor(private tweetService: TweetService ) { }

  ngOnInit(): void {

    this.username = localStorage.getItem("username")


    this.tweetService.getFeed(this.offset).subscribe((res)=> {
      console.log(res)
      this.tweets = res
    }, (err)=> {
      console.error(err)
    })
  }

}
