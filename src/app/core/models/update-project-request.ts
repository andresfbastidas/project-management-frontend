import { Delivery } from "./delivery";
import { Project } from "./project";
import { State } from "./state";
import { UserApp } from "./userApp";

export class UpdateProjectRequest{
    project!:Project;
    state!:State;
    deliveries!:Array<Delivery>
    userapp!:UserApp;
    projectid!:number;
    projectRequestId!:number;
    constructor(project:Project, state:State, deliveries:Array<Delivery>, userapp:UserApp,
        projectId:number, projectRequestId:number){
            this.project = project;
            this.state = state;
            this.deliveries = deliveries;
            this.userapp = userapp;
            this.projectid = projectId;
            this.projectRequestId = projectRequestId;
        }
}