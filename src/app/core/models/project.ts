import { State } from "./state";

export class Project {

    projectTitle!:String;
    dateFrom!:Date;
    dateUntil!:Date;
    generalObjetive!:String;
    justification!:String;
    projectMethology!:String;
    projectResearchTypologyId!:number;
    projectSummary!:String;
    specificObjetive!:String;
    state!:State;
}