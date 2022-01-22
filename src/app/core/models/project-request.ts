import { Project } from "./project";
import { StateRequest } from "./stateProjectRequest";

export class ProjectRequest {
    project!:Project;
    projectRequestId!: number;
    stateProjectRequestId!:number;
    stateNameProjectRequest!:string;
    details!:string;
    userName!:string;
    projectDirector!:string;
    isSelected!:boolean;
}