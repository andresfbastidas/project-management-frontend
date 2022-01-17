import { Project } from "./project";
import { StateRequest } from "./stateProjectRequest";

export class ProjectRequest {
    project!:Project;
    projectRequestId!: number;
    stateProjectRequest!:StateRequest;
    details!:string;
     
}