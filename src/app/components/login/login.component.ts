import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { Store } from '@ngxs/store';
import { addToken } from 'src/app/store/auth.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user: any
  constructor(private authService: AuthService, private router: Router, private store: Store) {

  }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''

    }

    this.authService.refreshToken().subscribe((response) => {
      this.authService.saveToken(response['token'])
      this.router.navigateByUrl('home')
    }, (error) => {
      console.log("Error")
      console.log(error.error)
    })
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.authService.authenticate(this.user).subscribe((response) => {


      this.authService.saveToken(response.token)
      // this.store.dispatch(new addToken(response.token))
      console.log(response.token)

      this.router.navigateByUrl('home');




    }, (error) => {
      console.log("Error")
      console.log(error.error)
    })



  }

}
