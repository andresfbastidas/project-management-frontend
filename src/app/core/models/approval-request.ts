export class ApprovalRequest{
    listProjectRequests!:any;
    projectDirector!:string;
    constructor(listProjectRequests:any, projectDirector:string){
        this.listProjectRequests = listProjectRequests;
        this.projectDirector = projectDirector;
    }
}