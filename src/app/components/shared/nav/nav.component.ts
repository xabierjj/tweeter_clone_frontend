import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  @Input()username:string
  constructor(private authService :AuthService, private router :Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('login')
  }

}
