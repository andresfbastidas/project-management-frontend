export class DeclineRequest{
    listProjectRequests!:any;
    details!:string
    constructor(listProjectRequests:any){
        this.listProjectRequests = listProjectRequests;
    }
}