import { Activity } from "./activity";
import { Project } from "./project";

export class ActivityRequest{
    activity!:Activity
    projectId!:number;

    constructor(activity:Activity, projectId:number){
        this.activity = activity;
        this.projectId = projectId;
    }
}