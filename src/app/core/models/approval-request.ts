export class ApprovalRequest{
    listProjectRequests!:any;
    projectDirector!:string
    details!:string
    constructor(listProjectRequests:any, projectDirector:string, details:string){
        this.listProjectRequests = listProjectRequests;
        this.projectDirector = projectDirector;
        this.details = details;
    }
}