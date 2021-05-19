import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.css']
})
export class TweetFormComponent implements OnInit {

  tweet:any = {
    content:''
  }

  @Output() tweeted: EventEmitter<any> = new EventEmitter<any>();
  constructor(private tweetService:TweetService) { }

  ngOnInit(): void {
  }
  


  onSubmit(form :NgForm) {
    if (form.invalid) {
      return
    }

    this.tweetService.makeTweet(this.tweet.content).subscribe((res)=> {
      console.log(res)
      this.tweeted.emit(res)
    })

    

  
  }

}
