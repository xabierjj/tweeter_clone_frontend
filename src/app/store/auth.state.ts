import { Injectable } from '@angular/core';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store'
import { addToken, removeToken } from './auth.actions'


@State({
    name: "auth",
    defaults: {
        auth: null

    }
})
@Injectable()
export class AuthState {

    @Selector()
    static getToken(authState: AuthStateModel) {
        return authState.auth.token
    }
    @Selector()
    static getUsername(authState: AuthStateModel) {
        return authState.auth.username
    }

    @Action(addToken)
    public addToken({ patchState }: StateContext<AuthStateModel>, action: addToken) {

        patchState({

            auth: action.payload

        })

    }

    @Action(removeToken)
    public removeToken({ patchState }: StateContext<AuthStateModel>, action: removeToken) {

        patchState({
            auth: null
        })

    }



}


export class AuthStateModel {

    auth: Auth

}

export interface Auth {
    token: string
    username: string
}



