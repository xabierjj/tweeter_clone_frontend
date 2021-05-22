import { Component, OnInit } from '@angular/core';
import { NgForm ,NgModel} from '@angular/forms';
import {  Store } from '@ngxs/store'
import { addUser } from 'src/app/store/user.actions';
import { User } from 'src/app/store/user.state';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

   user = {
     username:'',
     password:'',
     mail:''
     
   }
  constructor(private store:Store) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }

    console.log(this.user)
    this.store.dispatch( new addUser(this.user))


  }

}
