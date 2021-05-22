
import {Action, Select,Selector,State, StateContext} from '@ngxs/store'
import { addUser, getUsers, removeSelectedUser, removeUser, setSelectedUser, updateUser } from './user.actions'
import {tap} from 'rxjs/operators';
import  {UserService} from '../services/admin/user.service'
import { Injectable } from '@angular/core';
@State( {
    name:"users",
    defaults: {
        users : [],
        selectedUser:null
    }
})


@Injectable()

export class UserState {
    constructor (private userService: UserService) {}

    @Selector()
    static getUsers(state: UsersStateModel) {
        return state.users
    }
    @Selector()
    static getUser(state: UsersStateModel,id : number) {
        return state.users.find(user => user.id=id)
    }

    @Selector()
    static getSelectedUser(state:UsersStateModel) {
        return state.selectedUser
    }

    @Action(getUsers)
    get( {getState, patchState}: StateContext<UsersStateModel> , action:getUsers  ) {
        console.log("ACCCIOOON")
        this.userService.getUsers(action.payload).subscribe( (res)=> {
           
            patchState( {
                users:res
            })
        })

    }
    @Action(removeUser)
    remove( {getState, patchState}: StateContext<UsersStateModel> , action:removeUser  ) {

        this.userService.removeUser(action.payload).subscribe((res)=> {
            console.log(res)
            const state = getState()
            patchState( {
                users:state.users.filter( user=>user.id!=action.payload )
            })
        }, (err)=> {
            console.error(err)
        })

    }
    @Action(setSelectedUser)
    set( {getState, patchState}: StateContext<UsersStateModel>, action: setSelectedUser ) {
        const state = getState()
        console.error(action.payload)
        console.error(state.users.find( user=> user.id== action.payload))
        const user = state.users.find( user=> user.id== action.payload)
 
      
        patchState( {
            selectedUser:user
        })

    }

    @Action(removeSelectedUser)
    removeSelected( { patchState}: StateContext<UsersStateModel>, action: removeSelectedUser ) {
       
        patchState({
            selectedUser: null
        })
    }

    @Action(updateUser)
    update({getState, patchState}: StateContext<UsersStateModel>, action: updateUser) {

        this.userService.updateUser(action.payload).subscribe( (res)=> {
            console.log(res)

            const state = getState()
            patchState( {
                users: state.users.map( (user)=> {
                    if (user.id == action.payload.id) {
                        return action.payload
                    }else {
                        return user
                    }
                })
            })
        })
    }
    // @Action(addUser)
    // add( {getState, patchState}: StateContext<UsersStateModel> , action:addUser  ) {

    // }
}


export class UsersStateModel {
    users:User[]
    selectedUser:User
}



export interface User {
    id:number,
    username:string,
    email:string
}