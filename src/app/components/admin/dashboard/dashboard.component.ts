import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { addToken } from 'src/app/store/auth.actions';
import { AuthState } from 'src/app/store/auth.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username:string
  constructor(private store:Store, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.username = localStorage.getItem("name")
  }

  // checkToken() {
  //   const token = this.store.selectSnapshot<String>(AuthState.getToken)
  //   console.log(token)
  //   if (token == null) {
  //     this.authService.refreshToken().subscribe((res) => {
  //       console.log(res)
  //       this.store.dispatch(new addToken(res['token']))
  //     })

  //   }
  // }

}
