import { Profile } from "./profile";

export class UserApp{

    email!:string;
    firstName!:string;
    password!:string;
    secondName!:string;
    secondSurname!:string;
    surname!:string;
    userName!:string;
    profile!:Profile;
    constructor(email:string, firstName:string, password:string,
        secondName:string, secondSurname:string, surname:string,
        userName:string, profile:Profile){
            this.email = email;
            this.firstName = firstName;
            this.password = password;
            this.secondName = secondName;
            this.secondSurname = secondSurname;
            this.userName = userName;
            this.profile = profile;
            this.surname = surname;
        }
}