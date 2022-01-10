import { Activity } from "./activity";

export class ActivityRequest{
    activity!:Activity

    constructor(activity:Activity){
        this.activity = activity;
    }
}