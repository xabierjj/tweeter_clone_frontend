import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  term: string
  timeOut: any
  users:any[]
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  search() {

    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }

    this.timeOut = setTimeout(() => {
      this.userService.searchUser(this.term).subscribe((res) => {
        console.log(res)
        this.users= res
      }, (err) => {
        console.error(err)
      })
    }, 1000)
    
    console.log(this.term)
  }

}
