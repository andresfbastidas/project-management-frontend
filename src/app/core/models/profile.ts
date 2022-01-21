export class Profile{
    profileId!:number;
    profileName!:string;
    constructor(profileId:number,profileName:string){
       this.profileId=profileId;
       this.profileName = profileName;
    }
}