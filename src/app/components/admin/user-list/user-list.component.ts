import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store'
import { Observable } from 'rxjs';
import { User, UserState } from 'src/app/store/user.state';
import { getUsers, removeSelectedUser, removeUser, setSelectedUser, updateUser } from '../../../store/user.actions'
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private offset

  modalRef
  selectedUserModel: User
  @Select(UserState.getUsers) users: Observable<User[]>
  @Select(UserState.getSelectedUser) selectedUser: Observable<User>

  constructor(private store: Store, private modalService: NgbModal) {
    this.offset = 0

    this.selectedUser.subscribe((user) => {
      this.selectedUserModel = Object.assign({}, user)
    })
  }

  ngOnInit(): void {

    this.getUsers(this.offset)


  }


  getUsers(offset) {

    this.store.dispatch(new getUsers(offset))

  }

  deleteUser(id) {

    this.store.dispatch(new removeUser(id))
  }

  openEditModal(content, id) {
    this.store.dispatch(new setSelectedUser(id))

    this.modalRef = this.modalService.open(content)
    
    this.modalRef.result.then((result) => {

    }, (reason) => {
      this.store.dispatch(new removeSelectedUser())
    })
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.store.dispatch(new updateUser(this.selectedUserModel))
    this.modalRef.close()



  }

}
