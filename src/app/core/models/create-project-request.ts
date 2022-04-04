import { Delivery } from "./delivery";
import { Project } from "./project";
import { State } from "./state";
import { UserApp } from "./userApp";

export class CreateProjectRequest{

    project!:Project;
    state!:State;
    deliveries!:Array<Delivery>
    userapp!:UserApp;
    constructor(project:Project, state:State, deliveries:Array<Delivery>, userapp:UserApp
    ){
        this.project = project;
        this.state = state;
        this.deliveries = deliveries;
        this.userapp = userapp;
    }
}