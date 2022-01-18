export class DeclineRequest{
    listProjectRequests!:any;
    details!:string
    constructor(listProjectRequests:any, details:string){
        this.listProjectRequests = listProjectRequests;
        this.details = details;
    }
}