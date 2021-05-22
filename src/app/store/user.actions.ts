import { User } from "./user.state"




export class addUser {
    static readonly type ="[USER] add"
    constructor(public payload: any) {
        
    }
}
export class getUsers {
    static readonly type ="[USER] get"
    constructor(public payload: number) {
        
    }
}
export class removeUser {
    static readonly type ="[USER] remove"
    constructor(public payload :number) {

    }
}

export class updateUser {
    static readonly type ="[USER] update"
    constructor(public payload: User) {
        
    }
}

export class setSelectedUser {
    static readonly type = "[USER] setSelected"
    constructor(public payload:number){}
}

export class removeSelectedUser {
    static readonly type = "[USER] removeSelected"
    constructor(){}
}

