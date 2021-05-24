import { Component, HostListener, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { addToken } from 'src/app/store/auth.actions';
import { AuthState } from 'src/app/store/auth.state';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Select(AuthState.getToken) token: Observable<String>

  tweets: Array<any>
  username: string = ''

  private actualPage: number;
  showGoUpButton: boolean;
  private showScrollHeight = 400;
  private hideScrollHeight = 200;


  constructor(private tweetService: TweetService, private authService: AuthService, private store: Store) {
    this.showGoUpButton = false;
    this.actualPage = 0;

  }

  ngOnInit(): void {
    console.log("Check token")
 

    this.username = localStorage.getItem("username")


    this.tweetService.getFeed(this.actualPage).subscribe((res) => {
      console.log(res)
      this.tweets = res
      this.actualPage++
    }, (err) => {
      console.error(err)
    })


  


  }

  //  checkToken() {
  //   const token = this.store.selectSnapshot<String>(AuthState.getToken)
  //   console.log(token)
  //   if (token == null) {
  //     this.authService.refreshToken().subscribe((res) => {
  //       console.log(res)
  //       this.store.dispatch(new addToken(res['token']))
  //     })

  //   }
  // }

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
    if ((window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

}
