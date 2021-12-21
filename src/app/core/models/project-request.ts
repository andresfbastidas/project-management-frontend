import { Delivery } from "./delivery";
import { Project } from "./project";
import { State } from "./state";

export class ProjectRequest{

    project!:Project;
    state!:State;
    deliveries!:Array<Delivery>
    constructor(project:Project, state:State, deliveries:Array<Delivery>
    ){
        this.project = project;
        this.state = state;
        this.deliveries = deliveries;
    }
}