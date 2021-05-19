import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user:any
  constructor( private authService:AuthService, private router: Router ) { 

  }

  ngOnInit(): void {
    this.user= {
      username : '',
      password : ''

    }
  }

  onSubmit(form :NgForm) {
    if (form.invalid) {
      return 
    }

    this.authService.authenticate(this.user).subscribe( (response)=> {
      console.log(response)
     this.authService.saveToken(response.token, response.username)
     this.router.navigateByUrl('home');


    },(error)=> {
      console.log("Error")
      console.log(error.error)
    })
   


  }

}
