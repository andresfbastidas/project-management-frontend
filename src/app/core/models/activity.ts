import { Project } from "./project";
import { StateActivity } from "./state-activity";

export class Activity{
    activityName!:string;
    dateFrom!:Date;
    dateUntil!:Date;
    assignedUser!:string;
    stateActivity!:StateActivity;
    activityId!:number;

    constructor(activityName:string, dateFrom:Date, dateUntil:Date, 
        assignedUser:string, stateActivity:StateActivity){
       this.activityName = activityName;
       this.dateFrom = dateFrom;
       this.dateUntil = dateUntil;
       this.assignedUser = assignedUser;
       this.stateActivity = stateActivity;
    }
}