import { UserApp } from "./userApp";

export class SignupRequest{
    userapp!:UserApp;
    profileId!:number;

    constructor(userapp:UserApp, profileId:number){
        this.userapp = userapp;
        this.profileId = profileId;
    }
}