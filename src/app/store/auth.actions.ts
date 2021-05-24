


export class addToken  {
    static readonly type ="[AUTH] add"
    constructor( public payload: String) {

    }
}

export class removeToken  {
    static readonly type ="[AUTH] remove"
    constructor() {

    }
}