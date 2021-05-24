import { Injectable } from '@angular/core';
import {Action, Select,Selector,State, StateContext} from '@ngxs/store'
import { addToken, removeToken } from './auth.actions'


@State( {
    name:"auth",
    defaults: {
        token : null

    }
})
@Injectable()
export class AuthState {

    @Selector()
    static getToken(authState:AuthStateModel){
        return authState.token
    }


    @Action(addToken)
    public addToken( {patchState}:StateContext<AuthStateModel>, action: addToken  ){

        patchState( {
            token: action.payload
        })

    }

    @Action(removeToken)
    public removeToken( {patchState}:StateContext<AuthStateModel>, action: removeToken  ){

        patchState( {
            token: null
        })

    }

    

}


export class AuthStateModel {

    token:String
}

