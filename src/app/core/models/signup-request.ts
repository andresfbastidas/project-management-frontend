import { Profile } from "./profile";
import { UserApp } from "./userApp";

export class SignupRequest{
    userapp!:UserApp;
    constructor(userapp:UserApp){
        this.userapp = userapp;
    }
}