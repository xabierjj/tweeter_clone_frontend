import { Component, HostListener, OnInit } from '@angular/core';
import { TweetService } from 'src/app/services/tweet/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tweets: Array<any>

  username: string = ''

  private actualPage: number;
   showGoUpButton: boolean;
  private showScrollHeight = 400;
  private hideScrollHeight = 200;


  constructor(private tweetService: TweetService) {
    this.showGoUpButton = false;
    this.actualPage = 0;

  }

  ngOnInit(): void {

    this.username = localStorage.getItem("username")


    this.tweetService.getFeed(this.actualPage).subscribe((res) => {
      console.log(res)
      this.tweets = res
      this.actualPage++
    }, (err) => {
      console.error(err)
    })
  }

  onScroll() {

    console.log(1)
    this.tweetService.getFeed(this.actualPage).subscribe((res) => {
      console.log(res)

      console.log(this.tweets)
      // this.tweets.concat(res)
      console.log(this.tweets)
      this.tweets = [...this.tweets, ...res]
      this.actualPage++

    }, (err) => {
      console.error(err)
    })
  }



  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  addTweet(tweet) {

    this.tweets.unshift(tweet)

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

}
