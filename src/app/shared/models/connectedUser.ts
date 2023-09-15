export interface Member {
    id : number;
    pseudo : string;
    email : string;
    firstname : string;
    lastname : string;
}

export interface User {
    token : string;
    member : Member;
}