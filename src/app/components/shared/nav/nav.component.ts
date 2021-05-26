import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { removeToken } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  @Input()username:string
  constructor(private authService :AuthService, private router :Router, private store: Store) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe( (response)=> {
      this.store.dispatch(new removeToken)

      this.router.navigateByUrl('login')
    })
  
  }

}
