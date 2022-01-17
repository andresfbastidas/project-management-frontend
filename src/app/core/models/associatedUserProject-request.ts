export class AssociatedUserProjectRequest{
    userName!:string;
    projectId!:number;

    constructor(userName:string, projectId:number){
        this.userName =userName;
        this.projectId = projectId;
    }
}