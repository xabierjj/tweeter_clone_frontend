import { Auth } from "./auth.state"



export class addToken  {
    static readonly type ="[AUTH] add"
    constructor( public payload: Auth) {

    }
}

export class removeToken  {
    static readonly type ="[AUTH] remove"
    constructor() {

    }
}